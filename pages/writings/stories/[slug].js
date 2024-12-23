import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { slugListState } from "../../../lib/states";
import { createClient } from "contentful";
import ContentCard from "../../../components/cards/ContentCard";
import { INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Comments from "../../../components/Comments";

export default function Story({ story, storySlugList }) {
  const [slugList, setslugList] = useRecoilState(slugListState);
  useEffect(
    () =>
      setslugList({
        ...slugList,
        stories: storySlugList,
      }),
    []
  );

  // OPTIONS FOR RICHTEXT RENDERER
  const richText_Options = {
    // renderMark: {
    //     [MARKS.BOLD]: text => <>{text}</>,
    // },
    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => (
        <a target="_blank" rel="noreferrer" href={node.data.uri}>
          {children}
        </a>
      ),
    },
    // renderText: text => text.replace('!', '?'),
  };

  // dangerouslySetInnerHTML={{ __html: content.split('\n').join('\n\n') }}
  return (
    <div className="">
      <ContentCard
        title={story.fields.title}
        date={story.fields.dateTitle}
        intro={story.fields.intro}
        markdownContent={story.fields.content}
        borderColor={"border-green-400"}
        lgWidth={`lg:w-[1000px]`}
        bgColor={"bg-black"}
        textOrientation="text-justify"
      />

      <Comments
        border={`border-green-400`}
        bg_success={`bg-green-400`}
        bg_success_hover={`hover:bg-green-200`}
        ring={`ring-green-200`}
      />
    </div>
  );
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export async function getStaticPaths() {
  const res = await client.getEntries({ content_type: "story" });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "story",
    "fields.slug": params.slug,
  });

  const res2 = await client.getEntries({
    content_type: "story",
    order: "fields.indexFloat",
  });

  const storySlugList = [];
  for (let i = 0; i < res2.items.length; i++) {
    storySlugList.push(res2.items[i].fields.slug);
  }

  return {
    props: {
      story: items[0],
      storySlugList: storySlugList,
    },
  };
}
