import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import style from "./style.css";
import { SpaceInstances, Instance } from "InstancesInfo";

const Home: FunctionalComponent = () => {
  return (
    <div class={style.home}>
      <div class="search-container">
          <form method="GET" action="/search">
            <input type="text" placeholder="Search..." name="q" id="q" />
          </form>
      </div>
    </div>
  );
};

export default Home;
