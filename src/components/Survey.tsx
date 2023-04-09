import { Transition } from "solid-headless";
import { createSignal, For } from "solid-js";

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

export const Survey = () => {
  const [show, setShow] = createSignal(true);

  const submitSurvey = (answer: string) => {
    console.log("submitted", answer);
    setShow(false);
  };

  return (
    <div class="flex flex-col items-center w-full px-4 space-y-4">
      <Transition
        show={show()}
        class="w-full h-full flex flex-col items-center px-4 space-y-4"
        enter="transform transition duration-[600ms]"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 "
        leaveTo="opacity-0 "
      >
        <p class="text-xl dark:text-white text-cod-gray font-medium text-center">
          Rate the need for debate-enhancing software in your organization to
          join the waitlist!
        </p>
        <div class="flex flex-col space-y-2 w-full px-4">
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
      <Transition
        show={!show()}
        class="w-full flex flex-col items-center px-4 space-y-4 absolute mt-4"
        enter="transform transition duration-[2000ms]"
        enterFrom="opacity-0 "
        enterTo="opacity-100 "
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 "
        leaveTo="opacity-0 "
      >
        <WaitlistForm />
      </Transition>
    </div>
  );
};

const WaitlistForm = () => {
  

  return (
    <div class="flex flex-col items-center w-full px-4 space-y-4">
      <p class="text-xl dark:text-white text-cod-gray font-medium text-center">
        Join our wait list!
      </p>

      <form class="flex flex-row items-center space-x-2 w-full justify-center">
        <input
          placeholder="email address"
          class="px-3 py-1 bg-[#235761] rounded-xl text-white placeholder:text-gray-400 dark:bg-[#00DDE7] dark:text-black dark:placeholder:text-gray-600"
        ></input>
        <button
          class="rounded-2xl border border-black p-1 dark:border-white dark:text-white"
          onClick={(e) => {
            e.preventDefault();
            console.log("submitted");
          }}
        >
          <DoubleRightArrow />
        </button>
      </form>
    </div>
  );
};

const DoubleRightArrow = () => {
  return (
    <svg
      class="h-4 w-4"
      viewBox="-32 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z" />
    </svg>
  );
};
