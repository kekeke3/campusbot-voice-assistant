# EchoLearn - AI Voice Flashcard Assistant

**EchoLearn** is a smart AI-powered flashcard system that helps students memorize answers for exams through voice interactions. Students can input their questions, and if they don't provide answers, the AI (powered by Gemini) will generate them. The app also utilizes voice technology (Vapi.ai) to make studying more interactive, allowing students to hear questions, respond by voice, and track their learning progress.

---

## Features

- **Question & Answer Input:** Students can input their own questions and answers.
- **AI-Powered Answers:** If the student doesn't provide an answer, Gemini AI generates the response.
- **Voice Interaction:** Students can listen to questions and answers and respond using voice commands.
- **Progress Tracking:** Students can track their study progress and focus on weak areas.
- **Flashcard Mode:** Review and memorize questions like traditional flashcards, but with AI assistance.

---

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS
- **Backend API:** Next.js API routes
- **Voice AI Integration:** Vapi.ai for voice interaction
- **AI Answer Generation:** Gemini API (Google's Generative AI)
- **Database:** MongoDB with Prisma ORM
- **Deployment:** Vercel (for Next.js app)

---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB instance (local or cloud)
- Google Cloud account (for Gemini API)
- Vapi.ai account (for voice interaction)

### Steps

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/echolearn-ai-assistant.git
    ```

2. **Install dependencies:**
    ```bash
    cd echolearn-ai-assistant
    npm install
    ```

3. **Set up environment variables:**
   Create a `.env.local` file and add the following:
    ```
    GEMINI_API_KEY=your-gemini-api-key
    VAPI_API_KEY=your-vapi-api-key
    MONGODB_URI=your-mongodb-uri
    ```

4. **Run the development server:**
    ```bash
    npm run dev
    ```

    Open your browser and visit [http://localhost:3000](http://localhost:3000).

---

## Usage

1. **Log in** (optional, depending on your authentication setup)
2. **Input a question** you'd like to memorize
3. **Provide an answer** (optional, if you'd like to input your own)
4. The app will either:
    - Use your provided answer or
    - Query the AI to generate an answer if you left it blank.
5. **Voice interaction mode:** The AI will ask the question aloud and wait for your spoken response.
6. **Track your progress** and review your answers in the dashboard.

---

## Future Enhancements

- **Spaced Repetition:** Implement a system to quiz students more on the questions they got wrong.
- **Progress Analytics:** Visual charts to track the student's study habits and areas of improvement.
- **Multiple Subject Support:** Allow students to create flashcards for various subjects (Math, Science, History, etc.).

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- [Gemini API](https://cloud.google.com/generative-ai) for the AI answer generation
- [Vapi.ai](https://www.vapi.ai/) for the voice interaction technology
- [Next.js](https://nextjs.org/) for the frontend framework
- [Prisma](https://www.prisma.io/) for the database ORM
