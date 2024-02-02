import React from "react";
import { INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function ContentCard({
  title,
  date,
  intro,
  markdownContent,
  borderColor,
  bgColor,
  textOrientation,
  lgWidth,
}) {
  const richText_Options = {
    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => (
        <a target="_blank" rel="noreferrer" href={node.data.uri}>
          {children}
        </a>
      ),
    },
  };

  return (
    <div className="px-1.5">
      <div
        className={`mx-auto whitespace-pre-line ${lgWidth}
            min-w-[318px] sm:w-[590px] md:min-w-[620px] md:max-w-[800px] max-w-[590px]
            text-sm sm:text-base md:text-lg mb-20`}
      >
        <h1 className="textShadow text-2xl md:text-4xl m-4 font-cursive text-white text-center">
          {title}
        </h1>
        <div
          className={`py-2 sm:py-4 px-2 sm:px-6 mx-auto 
                ${textOrientation} font-light
                bg-opacity-60 ${bgColor ? bgColor : "bg-black"} 
                ring-4 border sm:border-2 ${
                  borderColor ? borderColor : "border-white"
                }
              text-white rounded-2xl`}
        >
          {(date || intro) && (
            <div className="mb-3 text-base md:text-lg font-cursive">
              {date && <p>{date}</p>}
              {intro && <p>{intro}</p>}
            </div>
          )}
          {documentToReactComponents(markdownContent, richText_Options)}
        </div>
      </div>
    </div>
  );
}
