import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

export const BlogCard = ({ id, authorName, content, publishedDate }: BlogCardProps) => {
  // Function to extract only the first <h1> and remove it from content
  const extractTitleAndContent = (htmlContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    
    const firstH1 = doc.querySelector("h1"); // Get the first <h1> tag
    let title = firstH1 ? firstH1.innerHTML : "Untitled"; // Extract title text

    // Remove the first <h1> tag from content
    if (firstH1) {
      firstH1.remove();
    }
    
    const remainingContent = doc.body.innerHTML; // Get the remaining HTML content

    return {
      title,
      content: remainingContent
    };
  };

  const { title, content: filteredContent } = extractTitleAndContent(content);

  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-200 pb-4 max-w-screen-lg cursor-pointer">
        <div className="flex">
          <Avatar name={authorName} />
          <div className="font-extrathin pl-2 text-md flex justify-center flex-col">{authorName} </div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-md text-slate-600 flex justify-center flex-col">
            {publishedDate}
          </div>
        </div>

        {/* Title extracted from first <h1> */}
        <div className="text-xl font-semibold pt-2">
          {title}
        </div>

        {/* Remaining content after removing first <h1> */}
        <div
          className="mt-2 text-gray-700"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(filteredContent),
          }}
        />

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
    <div className={"relative inline-flex items-center justify-center overflow-hidden"}>
      <span className={"font-bold text-lg text-gray-600 dark:text-gray-800"}>{name[0].toUpperCase()}</span>
    </div>
  );
}

// Circle component
export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}
