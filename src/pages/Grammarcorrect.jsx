import { useState } from "react";

const Grammarcorrect = () => {
    const [text, setText] = useState("");
    const [wordCount, setWordCount] = useState(0);
    const wordLimit = 500;

    const countWords = (text) => {
        return text.trim().split(/\s+/).filter((word) => word).length;
    };

    const handleChange = (e) => {
        const inputText = e.target.value;
        const words = countWords(inputText);
        setText(inputText);
        setWordCount(words);
    };
    const handleCopy = () => {
        navigator.clipboard.writeText("hello").then(() => {
          alert("Text copied to clipboard!");
        }).catch((err) => {
          alert("Failed to copy text: " + err);
        });
      };

    return (
        <>
            <div className="h-[78%] w-full md:pt-40 pt-32 font-mono md:pl-[7%] md:pr-[7%] pl-[4%] pr-[4%]">
                <div className="w-full h-[20%] md:text-center text-2xl  md:text-4xl mb-8 text-blue-600 text-left">Perfect Your Writing with Advanced AI Grammar Checks
                </div>
                <div className="w-full h-[75%] md:text-center md:text-2xl md:pb-24 pb-16">
                    Elevate your writing and enhance your reputation with AI-powered grammar checks that ensure clarity, accuracy, and professionalism in every piece you create.
                </div>
            </div>
            <div className="w-full bg-slate-900 md:p-12 p-[5%] text-white mb-10">
                <p className=" font-extrabold md:text-4xl text-2xl mb-7">How It Works: A Simple 3-Step Guide</p>
                <ol className="list-decimal list-inside space-y-4 md:text-xl text-base pb-[2%]">
                    <li><b>Paste Your Text:</b> Paste text directly into the input box.</li>
                    <li><b>Receive AI-Powered Suggestions:</b> Get detailed feedback on grammar and clarity.</li>
                    <li><b>Edit and Improve:</b> Make changes based on the suggestions to instantly enhance your writing.</li>
                </ol>
            </div>
            <div className="w-full md:p-12 p-[5%] md:pb-0">
                <p className=" font-extrabold md:text-4xl text-2xl">TRY NOW: AI-Powered Grammar Checker</p>
                <div className="h-9 md:h-auto w-full flex flex-row-reverse md:justify-start md:mb-[2%] md:mt-[1%] mt-[4%] mb-[4%] text-sm md:text-base">
                    <button className=" bg-blue-600 text-white md:px-4 md:py-2 p-1 rounded-md hover:text-blue-600 hover:bg-white border-blue-600 border-2">CHECK YOUR TEXT</button>
                </div>
                <textarea className="h-96 w-[100%] p-3 border-black border-2 rounded-lg  mb-[1%] resize-none" placeholder="ENTER OR PASTE YOUR TEXT HERE" value={text} onChange={handleChange}></textarea>
                <p className=""><b>Word Count Limit:</b> {wordCount}/{wordLimit}</p>
                {wordCount > wordLimit && (
                    <p className="text-red-500">You have exceeded the word limit!</p>
                )}
            </div>
            <div className="  w-full md:p-12 p-[5%] md:pt-5 pt-[0px]">
                <div className="h-9 md:h-auto w-full flex  justify-between md:mb-2 mb-[4%] mt-4  text-sm md:text-base">
                    <p className="text-2xl font-semibold md:mb-2 mb-[4%]">OUTPUT</p>
                    <button onClick={handleCopy} className=" bg-blue-600 text-white md:px-4 md:py-2 p-1 rounded-md hover:text-blue-600 hover:bg-white border-blue-600 border-2">COPY TEXT</button>
                </div>
                <textarea className="w-[100%] p-3 border-black border-2 rounded-lg mb-[1%] resize-none" disabled rows={4} placeholder="OUTPUT WILL BE SHOWN HERE"></textarea>
            </div>
        </>
    )
}

export default Grammarcorrect