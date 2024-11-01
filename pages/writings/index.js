import React from "react";
import PageTitle from "../../components/PageTitle";
import MenuCards from "../../components/cards/MenuCards";
import { bg_writings } from "../../lib/bg";

export default function Writings() {
  return (
    <>
      <PageTitle title={"Writings"} />
      <MenuCards data={data} />
    </>
  );
}

const data = [
  {
    href: "/writings/poems",
    title: "poems",
    img: bg_writings.poems,
    ringHover: "hover:ring-lime-400",
    childrenLi: <>Vibe, sound &amp; flow &amp; sound &amp; vibe &amp;</>,
  },
  {
    href: "/writings/notes",
    title: "notes",
    img: bg_writings.notes,
    ringHover: "hover:ring-emerald-400",
    childrenLi: (
      <>
        Here you&apos;ll find <span className="font-bold">Thoughts</span> and{" "}
        <span className="font-bold">Notes</span> that just came to my mind
      </>
    ),
  },
  {
    href: "/writings/stories",
    title: "stories",
    img: bg_writings.stories,
    ringHover: "hover:ring-green-400",
    childrenLi: (
      <>
        Most of the Stories happend as described, but actually some are a little
        fictional...
      </>
    ),
  },
];
