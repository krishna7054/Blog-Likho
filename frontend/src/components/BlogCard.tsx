import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = "AIzaSyBabhB-oEErVs9H_O0ulKt3tFU36Bs5im0"; // 🔥 Replace with your API key

interface BlogCardProps {
  authorName: string;
  content: string;
  publishedDate: string;
  id: string;
}

export const BlogCard = ({ id, authorName, content, publishedDate }: BlogCardProps) => {
  const [summary, setSummary] = useState<string>("Generating summary...");

  const formatDate = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleDateString("en-GB"); // dd/mm/yyyy
  };

  // Extract title and content
  const extractTitleAndContent = (htmlContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    const firstH1 = doc.querySelector("h1"); // Get the first <h1> tag
    let title = firstH1 ? firstH1.innerHTML : "Untitled";

    if (firstH1) firstH1.remove(); // Remove the first <h1> tag

    return { title, content: doc.body.innerHTML };
  };

  const { title, content: filteredContent } = extractTitleAndContent(content);

  // AI-powered summary generation
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const gemini = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = gemini.getGenerativeModel({ model: "gemini-pro" });
        const response = await model.generateContent(`Summarize this blog post in 2 sentences: ${filteredContent}`);
        setSummary(response.response.text());
      } catch (error) {
        console.error("Error generating summary:", error);
        setSummary("Failed to generate summary.");
      }
    };

    fetchSummary();
  }, [filteredContent]);

  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
          <div className="bg-yellow-400 border rounded-full w-7 h-7 flex justify-center">
            <Avatar name={authorName} />
          </div>
          <div className="font-extrathin pl-2 text-md flex justify-center flex-col">
            {authorName.toUpperCase()}
          </div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-md text-slate-600 flex justify-center flex-col">
            {formatDate(publishedDate)}
          </div>
        </div>

        {/* Title extracted from first <h1> */}
        <div className="text-xl font-semibold pt-2">{title}</div>

        {/* AI-Generated Summary */}
        <div className="mt-2 text-gray-700">{summary}..</div>

        {/* Remaining content after removing first <h1> */}
        {/* <div
          className="mt-2 text-gray-700"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(filteredContent),
          }}
        /> */}

        <div className="text-slate-500 text-sm font-thin pt-4">
          {`${Math.ceil(filteredContent.length / 100)} minute(s) read`}
        </div>
      </div>
    </Link>
  );
};

// Avatar component
export function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center overflow-hidden">
      <span className="font-bold text-lg text-gray-600 dark:text-gray-800">
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}

// Circle component
export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}
