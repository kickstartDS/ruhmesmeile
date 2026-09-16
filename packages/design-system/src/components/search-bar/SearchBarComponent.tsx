import { createContext, forwardRef, useContext } from "react";
import { SearchBarProps } from "./SearchBarProps";
import "./search-bar.scss";
import { TextField } from "@kickstartds/form/lib/text-field";
import Markdown from "markdown-to-jsx";
import { Icon } from "@kickstartds/base/lib/icon";
import { Link } from "@kickstartds/base/lib/link";
import { deepMergeDefaults } from "../helpers";
import defaults from "./SearchBarDefaults";

export type { SearchBarProps };

export const SearchBarContextDefault = forwardRef<
  HTMLDivElement,
  SearchBarProps
>(
  (
    {
      placeholder,
      hint = "Mit <kbd>Enter</kbd> startest du die Suche",
      alternativeText = "Meintest du",
      alternativeResult,
    },
    ref
  ) => (
    <div className="dsa-search-bar" ref={ref}>
      <div className="dsa-search-bar__input-container">
        <TextField
          hideLabel
          type="search"
          placeholder={placeholder || "Wonach suchst du?"}
          className="dsa-search-bar__input"
          autoComplete="off"
          name="q"
          label={"Suche"}
        />
        <Icon icon={"search"} />
      </div>
      {hint && <Markdown className="dsa-search-bar__hint">{hint}</Markdown>}
      {alternativeResult && (
        <p className="dsa-search-bar__alternative-text">
          <>
            {alternativeText + " "}
            <Link href="#">{alternativeResult}</Link>
          </>
        </p>
      )}
    </div>
  )
);

export const SearchBarContext = createContext(SearchBarContextDefault);
export const SearchBar = forwardRef<HTMLDivElement, SearchBarProps>(
  (props, ref) => {
    const Component = useContext(SearchBarContext);
    return <Component {...deepMergeDefaults(defaults, props)} ref={ref} />;
  }
);
SearchBar.displayName = "SearchBar";
