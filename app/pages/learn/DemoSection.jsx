import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function DemoSection() {
  return (
    <div className="bg-white px-6 pb-20 lg:px-8">
      <div className="mx-auto max-w-7xl text-base leading-7 text-gray-700 sm:p-6">
        <p className="text-base font-semibold leading-7 text-indigo-600">
          Meet
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          HappyParent
        </h1>
        <p className="mt-6 text-xl leading-8">
          Unravel the complexities of parenting with our AI-driven platform.
          From toddlers to teens, get bespoke advice and answers to all your
          parenting queries, backed by scientific research and expert insights.
        </p>
        <div className="mt-10 max-w-2xl">
          <p>
            Our AI understands the nuances of parenting and provides tailored
            suggestions. Whether you’re dealing with a picky eater, a sleepless
            toddler, or navigating your child’s education, our platform is
            equipped to assist you every step of the way.
          </p>
          <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Personalized Guidance.
                </strong>{" "}
                Get custom advice based on your child’s age, development stage,
                and your parenting style.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Instant Answers.
                </strong>{" "}
                Ask any question and get instant, research-backed answers.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Powered by Community Insights.
                </strong>{" "}
                Benefit from a wealth of knowledge, curated from a diverse
                community of parents and experts, providing rich, varied
                perspectives on parenting.
              </span>
            </li>
          </ul>
          <p className="mt-8">
            Our AI-driven approach makes parenting a more informed, less
            stressful journey. Let technology guide you through the joys and
            challenges of raising a child.
          </p>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            Empower Your Parenting Journey
          </h2>
          <p className="mt-6">
            Whether you’re a new parent or have been on this journey for years,
            our app adapts to your needs, offering relevant advice and support.
            It’s like having a parenting expert in your pocket.
          </p>
          <figure className="mt-10 border-l border-indigo-600 pl-9">
            <blockquote className="font-semibold text-gray-900">
              <p>
                “Navigating parenting challenges has never been easier. It’s
                reassuring to have reliable advice at my fingertips, any time of
                the day.”
              </p>
            </blockquote>
            <figcaption className="mt-6 flex gap-x-4">
              <img
                className="h-6 w-6 flex-none rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <div className="text-sm leading-6">
                <strong className="font-semibold text-gray-900">
                  Alex Johnson
                </strong>{" "}
                – Parent & App User
              </div>
            </figcaption>
          </figure>
          <p className="mt-10">
            Join the thousands of parents who have transformed their parenting
            approach with our AI-powered assistant.
          </p>
        </div>

        <div className="mt-16 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Your Partner in Parenting
          </h2>
          <p className="mt-6">
            Embrace the art of parenting with a companion that understands your
            concerns and empowers you with knowledge. Our app is more than a
            tool; it’s a partner in your parenting journey.
          </p>
          <p className="mt-8">
            Sign up today and take the first step towards a more fulfilling
            parenting experience.
          </p>
        </div>
      </div>
    </div>
  );
}
