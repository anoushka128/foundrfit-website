import { checkIns, demoUser, meals, reminders, symptoms } from "@/lib/mock-data";

console.log(
  JSON.stringify(
    {
      user: demoUser,
      meals,
      symptoms,
      checkIns,
      reminders
    },
    null,
    2
  )
);
