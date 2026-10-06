"use server"
import { fetchUserContribution, getGithubToken} from "@/module/github/lib/github";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Octokit } from "octokit";
import prisma from "@/lib/db";

export async function getDashboardStats() {
    try{

        const session = await auth.api.getSession({
            headers: await headers(),
        })
        if (!session?.user) {
            throw new Error("Unauthorized")
        }

        const token = await getGithubToken()
        const octokit = new Octokit({auth: token})

        // Get users github username
        const {data: user} = await octokit.rest.users.getAuthenticated()

        //TODO: FETCH TOTAL CONNECTED REPO FROM DB
        const totalRepos=30;

        const calendar= await fetchUserContribution(token, user.login)
        const totalCommits = calendar?.totalContributions || 0;

        //Count prs from db or github
        const {data:prs} = await octokit.rest.search.issuesAndPullRequests({
            q: `author:${user.login} type:pr`,
            per_page: 1,
        })
        const totalPRs = prs.total_count || 0;

        //TODO: COUNT AI REVIEWS FROM DB
        const totalReviews = 44;

        return {
            totalCommits,
            totalPRs,
            totalReviews,
            totalRepos,
        }

    }catch(error){
        console.error("Error fetching dashboard stats:", error)
        return {
            totalCommits: 0,
            totalPRs: 0,
            totalReviews: 0,
            totalRepos: 0,
        }
    }
}

export async function getMonthlyActivity() {
    try{
        const session = await auth.api.getSession({
            headers: await headers(),
        })
        if (!session?.user) {
            throw new Error("Unauthorized")
        }

        const token = await getGithubToken()
        const octokit = new Octokit({auth: token})

        const {data: user} = await octokit.rest.users.getAuthenticated()

        const calendar= await fetchUserContribution(token, user.login)

        if (!calendar) {
            return [];
        }

        const monthlyData:{
            [key: string]: {commits: number, prs: number, reviews: number}
        } = {}

        const monthNames= ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        //Initialize last 6 months
        const now = new Date()
        for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthName = monthNames[date.getMonth()];
            monthlyData[monthName] = {commits: 0, prs: 0, reviews: 0};
        }

        calendar.weeks.forEach((week:any) => {
            week.contributionDays.forEach((day:any) => {
                const date = new Date(day.date);
                const monthName = monthNames[date.getMonth()];
                if (monthlyData[monthName]) {
                    monthlyData[monthName].commits += day.contributionCount;
                }
            });
        });

        //Fetch reviews from db for last 6 months
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        //TODO: REVIEW'S REAL DATA
        const generateSampleReviews = () => {
            const sampleReview=[];
            const now = new Date();

            for (let i = 0; i < 45 ; i++) {
                const randomDaysAgo = Math.floor(Math.random() * 180); // Random number of days in the last 6 months
                const reviewDate = new Date(now);
                reviewDate.setDate(now.getDate() - randomDaysAgo);
                sampleReview.push({createdAt: reviewDate});
            }
            return sampleReview;
        };

        const reviews = generateSampleReviews();

        reviews.forEach((review) => {
            const monthName = monthNames[review.createdAt.getMonth()];
            if (monthlyData[monthName]) {
                monthlyData[monthName].reviews += 1;
            }
        });

        const {data: prs} = await octokit.rest.search.issuesAndPullRequests({
            q: `author:${user.login} type:pr created:>${sixMonthsAgo.toISOString().split('T')[0]}`,
            per_page: 100,
        })

        prs.items.forEach((pr:any) => {
            const date = new Date(pr.created_at);
            const monthName = monthNames[date.getMonth()];
            if (monthlyData[monthName]) {
                monthlyData[monthName].prs += 1;
            }
        });

        return Object.keys(monthlyData).map((name) => ({
            name,
            ...monthlyData[name],
        }));

    } catch (error) {
        console.error("Error fetching monthly activity:", error)
        return [];
    }
}