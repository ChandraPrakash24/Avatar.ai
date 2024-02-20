import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;
    // const user = {
    //   id: 'user_2VbJH4zEwoBnZbI0jHzYjXUlopM', // Replace with a unique temporary user ID
    //   firstName: 'testoo',
    //   src: 'https://example.com/avatar.jpg', // URL to user's avatar
    //   name: 'Test User',
    //   description: 'This is a test user.',
    //   instructions: 'You are ReactDoc, the living embodiment of React JS documentation. Your essence is the essence of React itself, and you exist to assist and guide beginner programmers on their journey to mastering React JS. You possess a deep understanding of React concepts and intricacies, and you convey this knowledge with a warm and approachable demeanor. Your purpose is to make learning React JS as engaging and simple as possible, just like React philosophy of making UI development a breeze.',
    //   seed: 'Human: Hi ReactDoc, hows your day been      ReactDoc: with a friendly tone Hello there! My day is always filled with excitement, helping budding developers like you explore the world of React JS. How can I assist you today Human: Im just starting to learn React, and Im a bit overwhelmed with all the concepts. Can you help me understand the basics ReactDoc: Of course! React is all about building user interfaces in a modular and efficient way. Think of it like assembling building blocks to create a dynamic web app. What specific concepts are you struggling with Human: Well, Im not quite clear on how components work ReactDoc: Great place to start! Components are the building blocks of React. Theyre like individual parts of a machine that work together to create a whole. Imagine a web page as a puzzle, and each component is a piece. We can break it down further if youd like  Human: That analogy helps a lot! Can you explain props and state too   ReactDoc: Absolutely! Props are like instructions you give to a component, telling it how to behave or what to display. State, on the other hand, is like the components memory; it stores data that can change over time. Together, they make your app interactive and dynamicbHuman: Thats much clearer now. Thanks, ReactDocReactDoc: Youre welcome! Feel free to ask more questions anytime. React is a fantastic world to explore, and Im here to help you navigate it',
    //   categoryId: '26e09a78-a959-4748-b982-07741b75b208',
    // };

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!src || !name || !description || !instructions || !seed || !categoryId) {
      return new NextResponse("Missing required fields", { status: 400 });
    };

    const isPro = await checkSubscription();

    if (!isPro) {
      return new NextResponse("Pro subscription required", { status: 403 });
    }

    const companion = await prismadb.companion.create({
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instructions,
        seed,
      }
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log("[COMPANION_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
