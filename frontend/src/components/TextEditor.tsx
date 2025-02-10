import { useState, useEffect, useRef, useMemo, ChangeEvent } from 'react';
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios';
import '../App.css';

const LICENSE_KEY =
	'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDAzNTUxOTksImp0aSI6IjJhZjMxZDM2LTM5OGYtNGNkYy1hOGI3LTc5OWI4MGYxNzY0OCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6Ijg5ZmQ0ODhiIn0.eelj7hqXJbmFfQtWHoP46WwUd2lctOEizNQ7YdgZt_4s4ua7NgKwTb68qah9jwCr-RZKlP1JFHmlNkLzEZpOSA';
    const GEMINI_API_KEY = "AIzaSyBabhB-oEErVs9H_O0ulKt3tFU36Bs5im0";
export default function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const editorWordCountRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);
	const cloud = useCKEditorCloud({ version: '44.1.0' });
    const [suggestions, setSuggestions] = useState<string | null>(null);
    const [selectedText, setSelectedText] = useState<string | null>(null);

    const fun=async(text:string)=>{
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Describe user input  to enhance the user sentence keep big and precise give me only plane text no other user_input :${text}`
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        setSuggestions(result.response.text())
        return result.response.text()
    }

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);


    // const fetchContentSuggestion = async (text: string) => {
    //     try {
    //         console.log("text",text);
            
    //         const response = await axios.post(
    //             `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=${GEMINI_API_KEY}`,
    //             { prompt: `Describe in detail: "${text}"` }
    //         );
    //         console.log("respo",response.data?.candidates?.[0]?.output);
            
    //         setSuggestions(response.data?.candidates?.[0]?.output || "No suggestions available.");
    //     } catch (error) {
    //         console.error("Error fetching suggestions:", error);
    //         setSuggestions("Failed to fetch suggestions.");
    //     }
    // };

    const handleSelection = () => {
        const selection = window.getSelection()?.toString();
        setSelectedText(selection && selection.trim() ? selection : null);
    };

	const { BalloonEditor, editorConfig } = useMemo(() => {
		if (cloud.status !== 'success' || !isLayoutReady) {
			return {};
		}

		const {
			BalloonEditor,
			Alignment,
			Autosave,
			BalloonToolbar,
			BlockToolbar,
			Bold,
			Essentials,
			FontColor,
			Heading,
			Italic,
			List,
			Mention,
			Paragraph,
			SpecialCharacters,
			SpecialCharactersArrows,
			SpecialCharactersCurrency,
			SpecialCharactersEssentials,
			SpecialCharactersLatin,
			SpecialCharactersMathematical,
			SpecialCharactersText,
			Title,
			Underline,
			WordCount
		} = cloud.CKEditor;

		return {
			BalloonEditor,
			editorConfig: {
				toolbar: {
					items: [
						'heading',
						'|',
						'fontColor',
						'|',
						'bold',
						'italic',
						'underline',
						'|',
						'specialCharacters',
						'|',
						'alignment',
						'|',
						'bulletedList',
						'numberedList'
					],
					shouldNotGroupWhenFull: false
				},
				plugins: [
					Alignment,
					Autosave,
					BalloonToolbar,
					BlockToolbar,
					Bold,
					Essentials,
					FontColor,
					Heading,
					Italic,
					List,
					Mention,
					Paragraph,
					SpecialCharacters,
					SpecialCharactersArrows,
					SpecialCharactersCurrency,
					SpecialCharactersEssentials,
					SpecialCharactersLatin,
					SpecialCharactersMathematical,
					SpecialCharactersText,
					Title,
					Underline,
					WordCount
				],
				balloonToolbar: ['bold', 'italic', '|', 'bulletedList', 'numberedList'],
				blockToolbar: ['fontColor', '|', 'bold', 'italic', '|', 'bulletedList', 'numberedList'],
               
				heading: {
					options: [
						{
							model: 'paragraph',
							title: 'Paragraph',
							class: 'ck-heading_paragraph'
						},
						{
							model: 'heading1',
							view: 'h1',
							title: 'Heading 1',
							class: 'ck-heading_heading1'
						},
						{
							model: 'heading2',
							view: 'h2',
							title: 'Heading 2',
							class: 'ck-heading_heading2'
						},
						{
							model: 'heading3',
							view: 'h3',
							title: 'Heading 3',
							class: 'ck-heading_heading3'
						},
						{
							model: 'heading4',
							view: 'h4',
							title: 'Heading 4',
							class: 'ck-heading_heading4'
						},
						{
							model: 'heading5',
							view: 'h5',
							title: 'Heading 5',
							class: 'ck-heading_heading5'
						},
						{
							model: 'heading6',
							view: 'h6',
							title: 'Heading 6',
							class: 'ck-heading_heading6'
						}
					]
				},
				// initialData:
				// 	"<h2>Congratulations on setting up CKEditor 5! 🎉</h2>\n<p>\n\tYou've successfully created a CKEditor 5 project. This powerful text editor\n\twill enhance your application, enabling rich text editing capabilities that\n\tare customizable and easy to use.\n</p>\n<h3>What's next?</h3>\n<ol>\n\t<li>\n\t\t<strong>Integrate into your app</strong>: time to bring the editing into\n\t\tyour application. Take the code you created and add to your application.\n\t</li>\n\t<li>\n\t\t<strong>Explore features:</strong> Experiment with different plugins and\n\t\ttoolbar options to discover what works best for your needs.\n\t</li>\n\t<li>\n\t\t<strong>Customize your editor:</strong> Tailor the editor's\n\t\tconfiguration to match your application's style and requirements. Or\n\t\teven write your plugin!\n\t</li>\n</ol>\n<p>\n\tKeep experimenting, and don't hesitate to push the boundaries of what you\n\tcan achieve with CKEditor 5. Your feedback is invaluable to us as we strive\n\tto improve and evolve. Happy editing!\n</p>\n<h3>Helpful resources</h3>\n<p>\n\t<i>An editor without the </i><code>Link</code>\n\t<i>plugin? That's brave! We hope the links below will be useful anyway </i>😉\n</p>\n<ul>\n\t<li>📝 Trial sign up: https://portal.ckeditor.com/checkout?plan=free,</li>\n\t<li>📕 Documentation: https://ckeditor.com/docs/ckeditor5/latest/installation/index.html,</li>\n\t<li>⭐️ GitHub (star us if you can!): https://github.com/ckeditor/ckeditor5,</li>\n\t<li>🏠 CKEditor Homepage: https://ckeditor.com,</li>\n\t<li>🧑‍💻 CKEditor 5 Demos: https://ckeditor.com/ckeditor-5/demo/</li>\n</ul>\n<h3>Need help?</h3>\n<p>\n\tSee this text, but the editor is not starting up? Check the browser's\n\tconsole for clues and guidance. It may be related to an incorrect license\n\tkey if you use premium features or another feature-related requirement. If\n\tyou cannot make it work, file a GitHub issue, and we will help as soon as\n\tpossible!\n</p>\n",
				licenseKey: LICENSE_KEY,
				mention: {
					feeds: [
						{
							marker: '@',
							feed: [
								/* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
							]
						}
					]
				},
				placeholder: 'Type or paste your content here!'
			}
		};
	}, [cloud, isLayoutReady]);

	return (
		<div className="main-container  pt-20">
			<div
				className=" editor-container editor-container_balloon-editor editor-container_include-block-toolbar editor-container_include-word-count"
				ref={editorContainerRef}
			>
				<div className="editor-container__editor text-3xl" onMouseUp={handleSelection}>
					<div ref={editorRef} >
						{BalloonEditor && editorConfig && (
							<CKEditor
								onReady={editor => {
									const wordCount = editor.plugins.get('WordCount');
                                    // @ts-ignore
									editorWordCountRef.current.appendChild(wordCount.wordCountContainer);
								}}
								onAfterDestroy={() => {
                                    // @ts-ignore
									Array.from(editorWordCountRef.current.children).forEach(child => child.remove());
								}}
								editor={BalloonEditor}
                                // @ts-ignore
								config={editorConfig}
                                onChange={(_event, editor) => {
                                    const data = editor.getData(); // Extract content from CKEditor
                                    // @ts-ignore
                                    onChange(data); // Pass the extracted data to the parent component
                                }}
                                
							/>
						)}
					</div>
				</div>
                {selectedText && (
                    /* From Uiverse.io by Javierrocadev */ 
<button
  className="overflow-hidden relative  p-2 h-12 mt-4 px-4 py-2  bg-lime-700 text-white border-none rounded-md text-xl font-bold cursor-pointer z-10 group"
  onClick={() => fun(selectedText)}
>
Generate with
  <span
    className="absolute w-40 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"
  ></span>
  <span
    className="absolute w-40 h-32 -top-8 -left-2 bg-purple-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"
  ></span>
  <span
    className="absolute w-44 h-32 -top-8 -left-2 bg-purple-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left"
  ></span>
  <span
    className=" group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-16 z-10"
    >AI</span>
</button>

                    // <button 
                    //     className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" 
                    //     onClick={() => fun(selectedText)}
                    // >
                    //     Generate with AI
                    // </button>
                )}
                {suggestions && (
                    <div className="p-4 mt-4 border border-gray-300 rounded-md">
                        <h3 className="font-bold text-lg">AI Suggestions:</h3>
                        <p className="text-gray-700">{suggestions}</p>
                    </div>
                )}
				<div className="editor_container__word-count" ref={editorWordCountRef}></div>
			</div>
          
		</div>
	);
}
