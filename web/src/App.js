import "./App.css";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { ReactComponent as LeftIcon } from "./images/left-svgrepo-com.svg";
import { ReactComponent as RightIcon } from "./images/right-svgrepo-com.svg";
import { ReactComponent as CheckedStar } from "./images/star-checked.svg";
import { ReactComponent as UncheckedStar } from "./images/star-unchecked.svg";
import { ReactComponent as UncheckedStarForWhite } from "./images/star-unchecked-for-white.svg";
import { ReactComponent as FacebookIcon } from "./images/facebook-svgrepo-com.svg";
import { ReactComponent as GmailIcon } from "./images/gmail-svgrepo-com.svg";
import { ReactComponent as GithubIcon } from "./images/github-svgrepo-com.svg";
import { ReactComponent as SendIcon } from "./images/send-svgrepo-com.svg";
import { ReactComponent as CoffeeIcon } from "./images/coffee-svgrepo-com.svg";
import { ReactComponent as MainIconOne } from "./images/mainpage/react-icon.svg";
import { ReactComponent as MainIconTwo } from "./images/mainpage/tailwindcss-black.svg";
import { ReactComponent as MainIconThree } from "./images/mainpage/nodejs-icon-logo-svgrepo-com.svg";

import { ReactComponent as ReactIconSmall } from "./images/introduction/react-icon.svg";
import { ReactComponent as TailwindIconSmall } from "./images/introduction/tailwindcss-black.svg";
import { ReactComponent as NodeJsIconSmall } from "./images/introduction/nodejs-icon-logo-svgrepo-com.svg";

function App() {
    const [loaded, isLoaded] = useState(false);
    const [state, setState] = useState(1);
    const [darkMode, setDarkMode] = useState(false);

    const [userData, setUserData] = useState(null);
    useEffect(() => {
        //fetch('') s
        (async () => {
            const pending_response = await fetch("/visits", { method: "GET" });
            const response = await pending_response.json();
            setUserData(response);
            isLoaded(true);
        })();

        (function isDarkModeEnabled() {
            if (
                window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
            ) {
                // dark mode
                setDarkMode(true);
            }
        })();
    }, []);

    //useEffect(() => handleTouchEnd(), [bpoint]); hello world
    useEffect(() => {
        documentRef(document);
    });
    const statePlus = () => {
        if (state === 2) return;
        setState((prev) => prev + 1);
    };
    const stateMinus = () => {
        if (state === 0) return;
        setState((prev) => prev - 1);
    };
    const { ref: documentRef } = useSwipeable({
        onSwiped: ({ dir, event }) => {
            if (dir === "Left") {
                statePlus();
            } else if (dir === "Right") {
                stateMinus();
            } else {
                return;
            }
        },
    });

    if (loaded === false) {
        return <div></div>;
    } else if (loaded === true) {
        return (
            <div className="m-0 p-0 h-screen box-border dark:bg-gray-900 bg-gray-100  dark:text-gray-100 bg-cover  overflow-hidden ">
                <div className=" w-full flex justify-between top-1/2  relative z-20 -mt-10">
                    {state === 0 ? (
                        <div className="" />
                    ) : (
                        <div className="" onClick={stateMinus}>
                            <LeftIcon />
                        </div>
                    )}
                    {state === 2 ? (
                        <div className="app-state-changing-button" />
                    ) : (
                        <div
                            className=" app-state-changing-button"
                            onClick={statePlus}
                        >
                            <RightIcon />
                        </div>
                    )}
                </div>
                {state === 1 ? (
                    <MainPage userData={userData} />
                ) : state === 0 ? (
                    <IntroductionPage />
                ) : state === 2 ? (
                    <FinalPage darkMode={darkMode} />
                ) : null}
            </div>
        );
    } else {
        return null;
    }
}

function MainPage({ userData }) {
    const [bubbled, setBubbled] = useState(false);

    useEffect(() => {
        setBubbled(true);
    }, []);

    return (
        <div className="h-screen w-screen box-border select-none relative z-0 overflow-hidden">
            <div className="flex justify-center py-4">
                <div className="w-96 h-96  relative ">
                    <div className="w-32 h-32  absolute m-auto left-[0] right-[0] animate-first-custom-animation animation-delay-1000">
                        <MainIconOne />
                    </div>
                    <div className="w-32 h-32  absolute m-auto top-0 bottom-0 left-[15%] animate-second-custom-animation animation-delay-1500">
                        <MainIconThree />
                    </div>
                    <div className=" w-32 h-32 absolute m-auto top-0 bottom-0 right-[15%] animate-third-custom-animation animation-delay-2000">
                        <MainIconTwo />
                    </div>
                    <div className="w-32 h-28  xl:pt-4 absolute m-auto left-0 right-0 bottom-0 flex justify-center ">
                        <span
                            className={
                                bubbled === false
                                    ? "font-extrabold md:text-3xl text-5xl whitespace-nowrap scale-110 duration-1000 ease-in-out "
                                    : "font-extrabold md:text-3xl text-5xl whitespace-nowrap hover:scale-110 duration-500 ease-in-out"
                            }
                        >
                            Hello world!
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex justify-center w-screen sm:gap-4 xl:gap-8 ">
                <div className="w-1/2 p-5">
                    <div
                        className="bg-gradient-to-r transform hover:bg-gradient-to-l rounded-xl
                 from-green-400 dark:from-green-500 to-green-300 shadow-green-700 
                 dark:to-green-400 py-2 px-16 
                 shadow-md flex flex-col"
                    >
                        <div className="flex justify-center">
                            <h3
                                className="                
                                   font-extrabold 
                                   text-xl"
                            >
                                {userData.current_user}
                            </h3>
                        </div>
                        <div className="flex justify-center font-bold ">
                            <span className=" whitespace-nowrap">
                                You visited
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 p-5">
                    <div
                        className="bg-gradient-to-r hover:bg-gradient-to-l rounded-xl
                 from-green-400 dark:from-green-500 to-green-300 
                 dark:to-green-400 py-2 px-16 shadow-green-700
                 shadow-md flex flex-col"
                    >
                        <div className="flex justify-center">
                            <h3
                                className="
                                   font-extrabold 
                                   text-xl
                                   "
                            >
                                {userData.totalVisitors}
                            </h3>
                        </div>
                        <div className="flex justify-center font-bold">
                            <span>Total visitors</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full pt-16 pb-6 text-sm text-center fade-in">
                <a href="https://goo.gl/maps/qVMduD93AR6UMjgu7">
                    <span className="text-gray-400">Made in Mongolia</span>
                </a>
            </div>
        </div>
    );
}

function IntroductionPage() {
    return (
        <div className="overflow-y-scroll h-screen w-screen px-4">
            <div
                className="py-4 pt-0 bg-white border-white
             dark:bg-gray-900 dark:border-black dark:shadow-2xl dark:shadow-gray-800 shadow-xl rounded-xl"
            >
                <div className="border-b-4 border-black flex justify-center   align-baseline">
                    <div className="pr-2 ">
                        <TailwindIconSmall />
                    </div>
                    <a href="https://tailwindcss.com/" target="_blank">
                        <h1 className="text-2xl self-baseline font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 to-blue-400">
                            Tailwind CSS
                        </h1>
                    </a>
                </div>
                <p className="font-bold mx-4 mt-1">
                    As the name suggests Tailwind, it's like a wind: flexible
                    and fast. Instead of scavanging website templates for CSS,
                    tailwind makes it simple by having pre-existing options. As
                    I was about to try TailwindCSS, I thought it would be
                    challenging - honestly didn't know what to expect. However,
                    when I downloaded Tailwind IntelliSense and started reading
                    through the docs, the library was intuitive and
                    well-managed. But I highly suggest learning the fundamentals
                    of CSS first, and once you are experienced and want to try
                    this technology use this{" "}
                    <a
                        href="https://nerdcave.com/tailwind-cheat-sheet"
                        className="underline underline-offset-2 font-extrabold"
                        target="_blank"
                    >
                        cheatsheet website
                    </a>
                    . My favorite features about TaiwindCSS are these radiant
                    colors and the default implemented box shadows. <br />
                    <div className="flex md:flex-col xl:flex-row py-3">
                        <div className="h-10 w-52 rounded-xl shadow-lg shadow-cyan-500 m-2 mb-4 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                        <div className="h-10 w-56 rounded-xl shadow-xl shadow-sky-500 m-2 mb-4 bg-gradient-to-r from-sky-500 to-indigo-500"></div>
                        <div className="h-10 w-60 rounded-xl shadow-2xl shadow-fuchsia-500 m-2 mb-4 bg-gradient-to-r from-violet-500 to-fuchsia-700"></div>
                        <div className="h-10 w-64 rounded-xl drop-shadow-2xl shadow-purple-600 m-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    </div>{" "}
                    The implemented options are great. You might be wondering if
                    Tailwind makes customization limited - well, actually, no.
                    If the default options are not good enough for you, you can
                    add your custom CSS to the tailwind.config.js file by
                    extending that option and reuse it through out your
                    application.
                    <div className=" flex justify-center">
                        <div className="border-2 border-black">
                            <img
                                src={require("./images/introduction/image_001.png")}
                            ></img>
                        </div>
                    </div>
                </p>
            </div>
            <br />
            <div
                className="py-4 border-2 pt-0 bg-white border-white
             dark:bg-gray-900 dark:border-black dark:shadow-2xl dark:shadow-gray-800 shadow-xl rounded-xl"
            >
                <div className="border-b-4 border-black flex justify-center   align-baseline">
                    <div className="pr-2 ">
                        <ReactIconSmall />
                    </div>
                    <a href="https://reactjs.org/" target="_blank">
                        <h1 className="text-2xl self-baseline font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 to-cyan-400">
                            React JS
                        </h1>
                    </a>
                </div>
                <p className="font-bold mx-4 mt-1">
                    Because I haven't tried any front UI libraries besides React
                    JS, I won't say that it is the best. Before functional
                    components were popular, if you didn't have an experience in
                    Object Oriented Programming, class components were
                    definitely like learning a new language which was hard.
                    However, it was better than pure HTML in many ways. React is
                    just like magic: the development mode lets you see your
                    changes instantly, the handling of DOM element's states with
                    Virtual DOM, hooks, and the reusable component architecture
                    all give you a nice developer experience.
                </p>
            </div>
            <br />{" "}
            <div
                className="py-4 border-2 pt-0 bg-white border-white
             dark:bg-gray-900 dark:border-black dark:shadow-2xl dark:shadow-gray-800 shadow-xl rounded-xl"
            >
                <div className="border-b-4 border-black flex justify-center   align-baseline">
                    <div className="pr-3 ">
                        <NodeJsIconSmall />
                    </div>
                    <a href="https://nodejs.org/" target="_blank">
                        <h1 className="text-2xl self-baseline font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-600 to-green-500">
                            Node JS
                        </h1>
                    </a>
                </div>
                <p className="font-bold mx-4 mt-1">
                    NodeJS is a JavaScript runtime that has a huge community.
                    The Node Package Manager covers almost everything with its
                    wide range of libraries. PHP's Laravel, Java's Spring,
                    Python's Django, C#'s .NET are all better in some ways, and
                    NodeJS is not definitely known for its speed or security, in
                    fact its worse but building light-weight applications it is
                    the right tool for the job. And one major perk is that you
                    can write your frontend in JS and your backend in JS, so you
                    don't have to learn other languages.
                    <a
                        href="https://www.youtube.com/watch?v=DHjqpvDnNGE"
                        className="hover:cursor-pointer"
                    >
                        <div className=" flex justify-center">
                            <div className="border-2 border-black">
                                <img
                                    src={require("./images/introduction/quote.png")}
                                ></img>
                            </div>
                        </div>
                    </a>
                </p>
            </div>
            <br />
        </div>
    );
}

function FinalPage({ darkMode }) {
    const [impressed, setImpressed] = useState(0);
    const [bubbled, setBubbled] = useState(false);
    const [showText, setShowText] = useState(false);
    const [blocker, setBlocker] = useState(false);
    const [feedback, setFeedback] = useState("");
    useEffect(() => {
        setBubbled(true);
    }, []);

    async function submitReview(e) {
        e.preventDefault();
        if (blocker === true) {
            setFeedback("Already sent!");
            return;
        }
        if (impressed === 0) {
            setFeedback("First star me!");
            return;
        }
        const pending_response = await fetch("/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                stars: impressed,
                message: feedback,
            }),
        });
        const response = await pending_response.json();
        if (response.sent === true) {
            setFeedback("Sent! ");
            setBlocker(true);
        }
    }
    return (
        <div className="h-screen w-screen box-border overflow-x-hidden overflow-y-hidden select-none flex flex-col ">
            <div className=" w-full flex justify-center  ">
                <h1
                    className={
                        bubbled === false
                            ? "bg-gradient-to-r rounded-xl from-green-400 dark:from-green-500 to-green-300 dark:to-green-400 py-2 px-16 mt-5 font-extrabold text-xl scale-110 duration-400 ease-in-out r shadow-xl"
                            : "bg-gradient-to-r rounded-xl from-green-400 dark:from-green-500 to-green-300 dark:to-green-400 py-2 px-16 mt-5 font-extrabold text-xl hover:scale-110 duration-300 ease-in-out r shadow-xl "
                    }
                >
                    Rate my UI by{" "}
                    <span className="text-[#ED8A19] font-bold">STARS</span>
                </h1>
            </div>
            <div className="w-full select-none flex justify-evenly py-4">
                <span
                    className="w-12 xl:w-20 hover:scale-105 duration-300 ease-in-out"
                    onClick={() => setImpressed(1)}
                >
                    {impressed >= 1 ? (
                        <CheckedStar />
                    ) : darkMode === true ? (
                        <UncheckedStar />
                    ) : (
                        <UncheckedStarForWhite />
                    )}
                </span>
                <span
                    className="w-12 xl:w-20 hover:scale-105 duration-300 ease-in-out"
                    onClick={() => setImpressed(2)}
                >
                    {impressed >= 2 ? (
                        <CheckedStar />
                    ) : darkMode === true ? (
                        <UncheckedStar />
                    ) : (
                        <UncheckedStarForWhite />
                    )}
                </span>
                <span
                    className="w-12 xl:w-20 hover:scale-105 duration-300 ease-in-out"
                    onClick={() => setImpressed(3)}
                >
                    {impressed >= 3 ? (
                        <CheckedStar />
                    ) : darkMode === true ? (
                        <UncheckedStar />
                    ) : (
                        <UncheckedStarForWhite />
                    )}
                </span>
                <span
                    className="w-12 xl:w-20 hover:scale-105 duration-300 ease-in-out"
                    onClick={() => setImpressed(4)}
                >
                    {impressed >= 4 ? (
                        <CheckedStar />
                    ) : darkMode === true ? (
                        <UncheckedStar />
                    ) : (
                        <UncheckedStarForWhite />
                    )}
                </span>
                <span
                    className="w-12 xl:w-20 hover:scale-105 duration-300 ease-in-out"
                    onClick={() => setImpressed(5)}
                >
                    {impressed >= 5 ? (
                        <CheckedStar />
                    ) : darkMode === true ? (
                        <UncheckedStar />
                    ) : (
                        <UncheckedStarForWhite />
                    )}
                </span>
            </div>

            <form
                className="w-4/5 h-2/5 border-r border-t border-b border-box rounded-r-xl my-2    hover:scale-105 duration-300 ease-in-out
                             p-4 bg-white dark:bg-gray-800 dark:border-black dark:shadow-2xl dark:shadow-gray-800 shadow-xl flex flex-col self-start justify-items-center"
                onSubmit={(e) => submitReview(e)}
            >
                <span className="font-medium pl-4">
                    Leave a feedback to the developer!
                </span>
                <div className="flex mt-3 pl-4 z-30">
                    <input
                        type="text"
                        className="border w-4/5 outline-none pl-4 dark:text-gray-800  cursor-default"
                        placeholder={
                            impressed <= 3 && impressed !== 0
                                ? "What went wrong?"
                                : "Write something... "
                        }
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        onClick={() => setFeedback("")}
                    ></input>
                    <button className="ml-4 w-9 bg-transparent">
                        <SendIcon />
                    </button>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 m-4">
                    * On{" "}
                    <a
                        href="https://itgelt-is-blogging.herokuapp.com/"
                        className="hover:underline underline-offset-2"
                    >
                        <strong>this</strong>{" "}
                    </a>
                    page your rating will be posted!
                </p>
            </form>

            <div
                className="w-4/5 h-2/5 border-l border-t border-b border-box rounded-l-xl my-2   hover:scale-105 duration-300 ease-in-out
                              px-2 py-4 bg-white dark:bg-gray-800 dark:border-black dark:shadow-2xl dark:shadow-gray-800  shadow-xl flex self-end justify-evenly"
            >
                <div
                    className="flex flex-grow-3 flex-col"
                    onMouseEnter={() => setShowText(true)}
                    onMouseLeave={() => setShowText(false)}
                >
                    <div className="flex ml-4 justify-center">
                        <div className="flex justify-center items-center">
                            <span
                                className={
                                    impressed <= 3 && impressed !== 0
                                        ? "font-medium pt-1  md:text-sm  whitespace-nowrap line-through "
                                        : "font-medium pt-1 md:text-sm  whitespace-nowrap  "
                                }
                            >
                                Buy me a coffee!
                            </span>
                        </div>

                        <div className="w-8 ">
                            <CoffeeIcon />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <img
                            className=" h-28 "
                            src={require("./images/socialpay.jpeg")}
                            alt="qr_code"
                        />
                    </div>
                    <span
                        className="font-normal text-center  underline underline-offset-4 relative"
                        onClick={() => {
                            setShowText((prev) => !prev);
                        }}
                    >
                        2405161658 Itgelt
                    </span>
                    {showText === true ? (
                        <span
                            className=" absolute border-1 rounded bg-gray-100 px-2  underline underline-offset-auto text-black"
                            style={{ bottom: "75px", right: "50%" }}
                        >
                            Golomt
                        </span>
                    ) : null}
                </div>
                <div className="flex items-center flex-grow-1 pr-2">
                    <span className=" font-extrabold xl:text-4xl sm:text-2xl">
                        Or
                    </span>
                </div>
                <div className="flex flex-grow-3 justify-center items-center flex-col">
                    <span className="text-center ">Check out</span>
                    <a
                        href="https://itgelt-is-chatting.herokuapp.com/"
                        target="_blank"
                    >
                        <span className="font-bold underline underline-offset-4  ">
                            THIS
                        </span>
                    </a>
                </div>
            </div>

            <div className=" w-screen flex flex-col justify-center py-6 px-4">
                <div className="flex justify-center mb-4">
                    <a
                        className="px-2 scale-110 hover:scale-125 duration-300 ease-in-out"
                        href="https://www.facebook.com/itgeltultra/"
                        target="_blank"
                    >
                        <FacebookIcon />
                    </a>
                    <a
                        className="px-2 scale-110 hover:scale-125 duration-300 ease-in-out"
                        href="https://github.com/itka0526"
                        target="_blank"
                    >
                        <GithubIcon />
                    </a>
                    <a
                        className="px-2 scale-110 hover:scale-125 duration-300 ease-in-out"
                        href="https://contacts.google.com/person/c8692183175649231489?hl=en"
                        target="_blank"
                    >
                        <GmailIcon />
                    </a>
                </div>
            </div>
        </div>
    );
}

function Comments() {
    return <div></div>;
}
export default App;
