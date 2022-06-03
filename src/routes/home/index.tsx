import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import style from "./style.css";
import { SpaceInstances, Instance } from "InstancesInfo";
import spaceInstanceTestData from "../../../spaceInstanceTestData";

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const Home: FunctionalComponent = () => {
  const [instanceNames, setInstanceNames] = useState([""]);
  const [randomBestGrade, setRandomBestGrade] = useState("");
  useEffect(() => {
    (async () => {
      //   const spaceInstances: SpaceInstances = await fetch(
      //     "https://searx.space/data/instances.json"
      //   ).then((data) => {
      //     console.log({ data });

      //     return data.json();
      //   });
      const { instances } = spaceInstanceTestData;
      const allInstanceNames = Object.keys(instances);
      const bestGrades = allInstanceNames.filter((instance) =>
        ["V", "C"].includes((instances as any)[instance]?.html?.grade)
      );
      //   setInstanceNames(allInstanceNames || []);
      const number = randomBetween(0, bestGrades.length);
      const best = bestGrades[number];
      setRandomBestGrade(best);
      //   const site = await fetch(best, {
      //     method: "PATCH",
      //     headers: {
      //       "Content-Type": "application/json",
      //       "API-Key": "secret",
      //     },
      //   }).then((data) => {
      //     console.log({ data });
      //     return data.text();
      //   });
      //   console.log({ site });

      //   console.log({ bestGrades, allInstanceNames, instances });
    })();
  }, []);
  return (
    <div class={style.home}>
      <h1>Home</h1>
      <p>This is the Home componente.</p>

      {/* <iframe
        is="x-frame-bypass"
        src={randomBestGrade}
        width="100%"
        height="300"
      ></iframe> */}
      {/* <iframe src={randomBestGrade} width="100%" height="300"></iframe> */}
    </div>
  );
};

export default Home;
