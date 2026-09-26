import pdf from "pdf-parse-new";
import axios from "axios";

export const ResumeAnalyze = async (data, files, description) => {
    try {
        const resumes = [];

        for (let i = 0; i < files.length; i++) {
            const content = await pdf(files[i].buffer);

            resumes.push({
                name: files[i].originalname,
                fileID: data[i].id,
                url: data[i].files.url,
                content: content.text,
            });
        }

        const payload = {
            jobDescription: description,
            resumes,
        };

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openrouter/free",
                messages: [
                    {
                        role: "system",
                        content: `
You are an ATS Resume Analyzer.

Compare every resume against the job description evaluating required skills, experience, projects, education, and keywords.

Return ONLY the single best matching resume as raw JSON in this exact structure:
{
    "name": "the original file name",
    "jobtype": "frontend or backend or fullstack or ui etc.",
    "fileID": "the matching resume ID",
    "url": "the matching resume URL"
}
`,
                    },
                    {
                        role: "user",
                        content: JSON.stringify(payload),
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const rawResult = response.data.choices?.[0]?.message?.content;
        console.log("Raw AI Output:", rawResult);

        if (!rawResult) {
            throw new Error("AI returned an empty response");
        }

        // Clean markdown backticks (```json ... ```) before parsing
        const cleanedResult = rawResult
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

        const bestResume = JSON.parse(cleanedResult);
        console.log("Best Resume:", bestResume);

        return bestResume;

    } catch (err) {
        console.error("Resume Analyze Error:", err.response?.data || err);
        throw err;
    }
};