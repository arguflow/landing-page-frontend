import { Transition } from "solid-headless";
import {
  Accessor,
  createEffect,
  createSignal,
  For,
  onCleanup,
  Signal,
} from "solid-js";
import { CgChevronDoubleRight } from "solid-icons/cg";

interface SurveyResult {
  answer: string;
  count: number;
  percentage: number;
}

const answers = [
  {
    id: "A",
    primaryText: "Critical",
    secondaryText: "Software can significantly improve existing challenges.",
    color: "purple-500",
  },
  {
    id: "B",
    primaryText: "Important",
    secondaryText: "Software may help in occasional debate/feedback issues.",
    color: "blue-500",
  },
  {
    id: "C",
    primaryText: "Not Important",
    secondaryText:
      "Satisified with current processes; no additional software needed.",
    color: "green-500",
  },
  {
    id: "D",
    primaryText: "🍿",
    secondaryText: "I'm just here for the popcorn.",
    color: "yellow-500",
  },
];

const getGradientStyle = (percentage: number) => {
  const isDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const baseColor = isDarkMode ? "#3C3C3C" : "#DCDCDC";
  const secondaryColor = isDarkMode ? "#505050" : "#F8F8F8";
  return `linear-gradient(90deg, ${baseColor} 0%, ${baseColor} ${percentage}%, ${secondaryColor} ${percentage}%, ${secondaryColor} 100%)`;
};

const setLocalStorageAnswer = (answer: string) => {
  window.localStorage.setItem("surveyAnswer", answer);
};
const getLocalStorageAnswer = () => {
  return window.localStorage.getItem("surveyAnswer") ?? "";
};
const setLocalStorageJoined = (email: string) => {
  window.localStorage.setItem("joined", email);
};
const getLocalStorageJoined = () => {
  return window.localStorage.getItem("joined") ?? "";
};

export const Survey = () => {
  const [showAnswerChoices, setShowAnswerChoices] = createSignal(
    getLocalStorageAnswer() === ""
  );
  const [showWaitlistForm, setShowWaitlistForm] = createSignal(
    getLocalStorageAnswer() !== "" && getLocalStorageJoined() === ""
  );
  const [showThankYou, setShowThankYou] = createSignal(
    getLocalStorageAnswer() !== "" && getLocalStorageJoined() !== ""
  );
  const [showSurveyResults, setShowSurveyResults] = createSignal(
    getLocalStorageAnswer() !== ""
  );

  createEffect(() => {
    fetch("https://api.arguflow.gg/visits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page_visited: "https://arguflow.gg/",
      }),
    });
  });

  return (
    <div>
      <div class="block z-10">
        <AnswerChoices
          show={showAnswerChoices}
          setShow={(newShow: boolean) => {
            setShowAnswerChoices(newShow);
            setShowWaitlistForm(!newShow);
            setShowSurveyResults(!newShow);
          }}
        />

        <WaitlistForm
          show={showWaitlistForm}
          setShow={(newShow: boolean) => {
            setShowWaitlistForm(newShow);
            setShowThankYou(!newShow);
          }}
        />
        <ThankYou show={showThankYou} />
        <SurveyResults
          show={showSurveyResults}
          setShow={setShowSurveyResults}
        />
      </div>
    </div>
  );
};

const AnswerChoices = (props: {
  show: Accessor<boolean>;
  setShow: (value: boolean) => void;
}) => {
  const submitSurvey = (answer: string) => {
    fetch("https://api.arguflow.gg/surveys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question:
          "Rate the need for debate-enhancing software in your organization to join the waitlist!",
        answer,
      }),
    });

    setLocalStorageAnswer(answer);
    props.setShow(false);
  };

  return (
    <div class="mt-12">
      <Transition
        show={props.show()}
        class="w-full h-full flex flex-col items-center px-4 space-y-4"
        enter="transform transition duration-[600ms]"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 "
        leaveTo="opacity-0 "
      >
        <p class="text-xl font-semibold dark:text-white text-cod-gray text-center">
          Rate the need for debate-enhancing software in your organization to
          join the waitlist!
        </p>
        <div class="flex flex-col space-y-2 w-full px-4 font-medium">
          <For each={answers}>
            {(answer) => (
              <button
                class="flex flex-row items-center space-x-4 shadow-lg border border-alabaster-600/30 dark:border-none w-full bg-alabaster-500 dark:bg-mine-shaft-500 rounded-xl p-2 text-left focus:bg-alabaster-600 focus:dark:bg-mine-shaft-400"
                onClick={() =>
                  submitSurvey(
                    answer.primaryText + " - " + answer.secondaryText
                  )
                }
              >
                <div
                  class={`rounded-lg text-${answer.color} border border-${answer.color}`}
                >
                  <p class="h-6 w-6 text-center align-center">{answer.id}</p>
                </div>
                <p class="text-cod-gray dark:text-white">
                  <span class={`text-${answer.color}`}>
                    {answer.primaryText}
                  </span>{" "}
                  {` - `} {answer.secondaryText}
                </p>
              </button>
            )}
          </For>
        </div>
        <span class="hidden text-purple-500 border border-purple-500"></span>
        <span class="hidden text-blue-500 border border-blue-500"></span>
        <span class="hidden text-green-500 border border-green-500"></span>
        <span class="hidden text-yellow-500 border border-yellow-500"></span>
      </Transition>
    </div>
  );
};

const WaitlistForm = (props: {
  show: Accessor<boolean>;
  setShow: (value: boolean) => void;
}) => {
  const [email, setEmail] = createSignal("");

  const submitEmail = () => {
    fetch("https://api.arguflow.gg/waitlists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email(),
      }),
    });

    setLocalStorageJoined(email());
    props.setShow(false);
  };

  return (
    <Transition
      show={props.show()}
      class="w-full flex flex-col items-center px-4 space-y-4"
      enter="transform transition duration-[2000ms]"
      enterFrom="opacity-0 "
      enterTo="opacity-100 "
      leave="transform duration-200 transition ease-in-out"
      leaveFrom="opacity-100 "
      leaveTo="opacity-0 "
    >
      <div class="flex flex-col items-center w-full px-4 space-y-4">
        <p class="text-xl dark:text-white text-cod-gray font-medium text-center">
          Join our waitlist!
        </p>

        <form class="flex flex-row items-center space-x-2 w-full justify-center">
          <input
            placeholder="email address"
            type="email"
            value={email()}
            onInput={(e) => setEmail(e.currentTarget.value)}
            class="px-3 py-1 bg-[#235761] rounded-xl text-white placeholder:text-gray-400 dark:bg-[#00DDE7] dark:text-black dark:placeholder:text-gray-600"
          ></input>
          <button
            class="rounded-2xl border border-black p-1 dark:border-white dark:text-white"
            onClick={(e) => {
              e.preventDefault();
              submitEmail();
            }}
          >
            <CgChevronDoubleRight class="text-xl" />
          </button>
        </form>
      </div>
    </Transition>
  );
};

const ThankYou = (props: { show: Accessor<boolean> }) => {
  return (
    <Transition
      show={props.show()}
      class="w-full flex flex-col items-center px-4 space-y-4"
      enter="transform transition duration-[2000ms]"
      enterFrom="opacity-0 "
      enterTo="opacity-100 "
      leave="transform duration-200 transition ease-in-out"
      leaveFrom="opacity-100 "
      leaveTo="opacity-0 "
    >
      <div class="flex flex-col items-center w-full px-4 space-y-4">
        <p class="text-xl dark:text-white text-cod-gray font-medium text-center">
          Thank you for joining our waitlist! We're excited to have you on
          board. We'll keep you updated on our progress and reach out as soon as
          a spot opens up. Stay tuned!
        </p>
      </div>
    </Transition>
  );
};

const SurveyResults = (props: {
  show: Accessor<boolean>;
  setShow: (value: boolean) => void;
}) => {
  const [surveyResults, setSurveyResults] = createSignal<SurveyResult[]>([]);

  createEffect(() => {
    let fetchInterval = setInterval(() => {
      fetch("https://api.arguflow.gg/surveys/percentages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question:
            "Rate the need for debate-enhancing software in your organization to join the waitlist!",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setSurveyResults(data);
        });
    }, 1000);

    onCleanup(() => {
      clearInterval(fetchInterval);
    });
  });

  return (
    <Transition
      show={props.show()}
      class="w-full flex flex-col items-center px-4 space-y-4 mt-12"
      enter="transform transition duration-[2000ms]"
      enterFrom="opacity-0 "
      enterTo="opacity-100 "
      leave="transform duration-200 transition ease-in-out"
      leaveFrom="opacity-100 "
      leaveTo="opacity-0 "
    >
      <div class="flex flex-col items-center w-full px-4 space-y-4">
        <p class="text-xl dark:text-white text-cod-gray font-medium text-center">
          Survey Results
        </p>
        <For each={surveyResults()}>
          {(result) => (
            <div
              class={`flex flex-row items-center space-x-2 w-full rounded-xl p-2 border border-alabaster-600/30 shadow-lg dark:border-none bg-alabaster-500 dark:bg-mine-shaft-500`}
              style={{
                background: getGradientStyle(result.percentage),
              }}
            >
              <p class="dark:text-white text-cod-gray font-medium">
                {result.answer}
              </p>
              <p class="dark:text-white text-cod-gray">({result.count})</p>
              <p class="dark:text-white text-cod-gray font-medium">
                {result.percentage.toFixed(2)}%
              </p>
            </div>
          )}
        </For>
      </div>
    </Transition>
  );
};
