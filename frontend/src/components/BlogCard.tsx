import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "react-toastify";

const GEMINI_API_KEY = "AIzaSyBabhB-oEErVs9H_O0ulKt3tFU36Bs5im0"; 

interface BlogCardProps {
  authorName: string;
  content: string;
  publishedDate: string;
  id: string;
}

export const BlogCard = ({ id, authorName, content, publishedDate }: BlogCardProps) => {
  const [summary, setSummary] = useState<string>("Wait a second ...");
  const [tag, setTag] = useState<string>("N/A");

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
        const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
        const response = await model.generateContent(`Summarize the following blog post in two concise sentences:\n\n${filteredContent}`);
        const response2 = await model.generateContent(`Provide a single, relevant tag that best represents the main topic of the following blog post:\n\n${filteredContent}\n\nOnly return the tag without any additional text.`);
        setSummary(response.response.text());
        setTag(response2.response.text());
      } catch (error) {
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
            <Avatar name={authorName} size={"small"}/>
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
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="p-1 ml-1 font-semibold text-md text-cyan-700 text-slate-600 flex justify-center flex-col border border-yellow-500  ">
            {tag}
          </div>
        </div>

        {/* Title extracted from first <h1> */}
        <div className="text-xl font-semibold pt-2">{title}</div>

        {/* AI-Generated Summary */}
        <div className="mt-2 text-gray-700">{summary}..</div>

       

        <div className="text-slate-500 text-sm font-thin pt-4">
          {`${Math.ceil(filteredContent.length / 100)} minute(s) read`}
        </div>
      </div>
    </Link>
  );
};

// Avatar component
export function Avatar({ name, size="small" }: { name: string, size:"small" | "big" }) {
  return (
    <div className="relative inline-flex items-center justify-center overflow-hidden ">
      <span className={`font-bold  text-gray-600 dark:text-gray-800 ${size === "small" ? "text-lg":"text-8xl"}`}>
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}

// Circle component
export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}
