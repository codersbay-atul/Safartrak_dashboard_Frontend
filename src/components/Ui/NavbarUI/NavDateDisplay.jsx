import { useState, useEffect } from "react";
import NavText from "./NavTextSize";
import TextColor from "./NavTextColor";

export default function NavDateDisplay() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const weekday = currentDate.toLocaleDateString("en-US", { weekday: "long" });
  const monthDayYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="hidden lg:block text-right leading-none shrink-0 ml-2.5">
      <NavText as="p" size="dayText">
        <TextColor color="navbarText">{weekday},</TextColor>
      </NavText>
      <NavText as="p" size="monthText" className="mt-0.5">
        <TextColor color="monthText">{monthDayYear}</TextColor>
      </NavText>
    </div>
  );
}