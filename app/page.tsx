import Link from "next/link";
import { ArrowRight, BookOpen, Mic, Brain, BarChart } from "lucide-react";
/* import { Button } from "@/components/ui/button";
 */

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="fixed top-0 left-0 w-full bg-gray-800 z-50 border-b border-gray-300 ">
        <div className="text-white flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl  font-bold">EchoLearn</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <button className="h-9 rounded-md px-3 hover:bg-accent hover:text-accent-foreground cursor-pointer hover:underline underline-offset-4">
                Sign In
              </button>
            </Link>

            <Link href="/sign-up">
              <button className="h-9 rounded-md px-3 cursor-pointer bg-gray-100 text-black hover:bg-gray-300">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className=" px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Memorize Smarter with Voice-Powered Flashcards
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  EchoLearn uses AI to help you memorize exam answers through
                  natural voice interaction. Study smarter, not harder.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/sign-up">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 gap-1 bg-gray-800 text-white hover:bg-gray-700 cursor-pointer">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>

                <Link href="#how-it-works">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-background hover:bg-gray-200 h-11 px-8 cursor-pointer">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:ml-auto flex justify-center">
              <div className="relative h-[350px] w-[350px] rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <BookOpen className="h-24 w-24 text-gray-500" />
                <div className="absolute -bottom-4 -right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
                  <Mic className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className=" px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Key Features
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Discover how EchoLearn transforms your study experience
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-300 p-6 shadow-sm">
              <div className="p-2 bg-primary/10 rounded-full">
                <Mic className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Voice Interaction</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Practice answering questions out loud, just like in a real exam
                situation.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-300 p-6 shadow-sm">
              <div className="p-2 bg-primary/10 rounded-full">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">AI-Generated Answers</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Gemini AI creates accurate answers for your questions when you
                don&apos;t have them.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border border-gray-300 p-6 shadow-sm">
              <div className="p-2 bg-primary/10 rounded-full">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Progress Tracking</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Monitor your improvement over time with detailed performance
                analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
      >
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                How It Works
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Simple steps to enhance your learning experience
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-lg font-bold text-white">
                1
              </div>
              <h3 className="text-xl font-bold">Input Questions</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Add your exam questions to the system. If you don&apos;t have
                answers, Gemini AI will generate them.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-lg font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-bold">Practice with Voice</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Listen to questions and respond verbally using Vapi.ai&apos;s
                voice technology.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-lg font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-bold">Track Progress</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Review your performance and focus on areas that need
                improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
        <div className=" px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Student Success Stories
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Hear from students who improved their exam results with
                EchoLearn
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 mt-12">
            <div className="rounded-lg border border-gray-300 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div>
                  <h3 className="text-lg font-bold">Sarah K.</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Medical Student
                  </p>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    &quot;EchoLearn transformed how I study for anatomy exams.
                    Being able to practice verbally made a huge difference in my
                    retention and confidence.&quot;
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-gray-300 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div>
                  <h3 className="text-lg font-bold">Michael T.</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Law Student
                  </p>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    &quot;The AI-generated answers helped me understand complex
                    legal concepts. My bar exam prep is so much more efficient
                    now.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800 text-white">
        <div className=" px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Study Habits?
              </h2>
              <p className="max-w-[600px] text-primary-foreground/80 md:text-xl">
                Join thousands of students who are studying smarter with
                EchoLearn.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/sign-up">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-100 text-black hover:bg-gray-300 h-11 px-8 gap-1 cursor-pointer">
                  Get Started for Free <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 border-t">
        <div className=" flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12">
          <div className="flex flex-col gap-2 md:gap-4 lg:gap-6">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              <span className="text-xl font-bold">EchoLearn</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 EchoLearn. All rights reserved.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-gray-500 hover:underline dark:text-gray-400"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-500 hover:underline dark:text-gray-400"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-500 hover:underline dark:text-gray-400"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-gray-500 hover:underline dark:text-gray-400"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-500 hover:underline dark:text-gray-400"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-500 hover:underline dark:text-gray-400"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-gray-500 hover:underline dark:text-gray-400"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-500 hover:underline dark:text-gray-400"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-500 hover:underline dark:text-gray-400"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
