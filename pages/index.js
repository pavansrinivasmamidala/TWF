import words from "../helpers/words.json";
import { useEffect, useState } from "react";
import shuffleWords from "../helpers/shuffleWords";

export default function Home() {
  const [typed, setTyped] = useState("");
  const [enteredPairs, setEnteredPairs] = useState(["initial"]);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    window.onkeydown = (e) => {
      if (e.key.length == 1 && e.key != "Tab" && e.key != "Backspace") {

        if (validate(e.key, wordIndex, charIndex)) {

          console.log("validation successful " + charIndex + " " + wordIndex)

          

        } else console.log("error" + charIndex + " " + wordIndex);

        console.log(e.key);
      }
      setTyped(e.key);
    };
    console.log(enteredPairs);
  }, [typed]);

  const validate = (key, wordIndex, charIndex) => {
    if (key === shuffleWords[wordIndex][charIndex]) {
      charIndex + 1 === shuffleWords[wordIndex].length
        ? setCharIndex(0)
        : setCharIndex(charIndex + 1);

        setEnteredPairs((enteredPairs) => [
          ...enteredPairs,
          wordIndex + "-" + charIndex
        ]);

      console.log(shuffleWords[wordIndex].length + " word Index:" + wordIndex);
      return true;
    } else if (key === " ") {
      setWordIndex(wordIndex + 1);
      return true;
    } else return false;
  };

  

  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <div className="flex flex-wrap pr-60 pl-60  pb-20">
        {shuffleWords.map((word, idx) => {
          return (
            <div key={word + idx} className="flex pr-2">
              {[...word].map((char, index) => {
                if (enteredPairs.includes(idx + "-" + index))
                  return (
                    <p
                      key={index}
                      className="text-xl font-semibold text-blue-500"
                    >
                      {char}
                    </p>
                  );
                else
                  return (
                    <p key={index} className="text-xl font-semibold">
                      {char}
                    </p>
                  );
              })}
            </div>
          );
        })}
      </div>
      <div></div>
    </div>
  );
}
