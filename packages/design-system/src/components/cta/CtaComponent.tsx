import { HTMLAttributes, createContext, forwardRef, useContext } from "react";
import { CtaProps } from "./CtaProps";
import "./cta.scss";
import { StorytellingContextDefault } from "@kickstartds/content/lib/storytelling";
import { ButtonContext } from "@kickstartds/base/lib/button";
import classnames from "classnames";
import { useButtonGroup } from "../button-group/ButtonGroupComponent";
import { Container } from "@kickstartds/core/lib/container";
import { deepMergeDefaults } from "../helpers";
import defaults from "./CtaDefaults";

export type { CtaProps };

export const CtaContextDefault = forwardRef<
  HTMLDivElement,
  CtaProps & HTMLAttributes<HTMLDivElement>
>(
  (
    {
      headline,
      highlightText = false,
      sub,
      image,
      text,
      textAlign,
      backgroundImage,
      backgroundColor,
      colorNeutral,
      align,
      padding,
      inverted = false,
      order,
      buttons = [],
      ...rest
    },
    ref
  ) => {
    const ButtonGroup = useButtonGroup();

    return (
      <ButtonContext.Provider
        // @ts-expect-error
        value={ButtonGroup}
      >
        <Container name="storytelling">
          <StorytellingContextDefault
            {...rest}
            ref={ref}
            className={classnames(
              "dsa-cta",
              highlightText ? `dsa-cta--highlight-text` : "",
              colorNeutral ? `dsa-cta--color-neutral` : "",
              image?.padding ? `dsa-cta--image-padding` : "",
              /* Only an explicit `padding: false` turns the content padding off.
               * With `!padding`, absent values also stripped it — and no cta in
               * this space sets the field, so every one of them rendered
               * unpadded, against the pre-migration look (which ignored the field
               * entirely, having no `--no-padding` rule). */
              padding === false ? `dsa-cta--no-padding` : "",
              align && align !== "center" ? `dsa-cta--align-${align}` : ""
            )}
            backgroundImage={backgroundImage}
            backgroundColor={backgroundColor}
            full
            image={{
              source: image?.src,
              order: order,
              vAlign: image?.align,
            }}
            box={{
              text: text,
              textAlign: textAlign,
              /* `image_align` positions the text box against the image, which is
               * what the pre-migration cta did: a `cta` with `image_align: bottom`
               * rendered `.c-storytelling__box--bottom`, and the component here
               * only fed the ds' own `align` prop through. The legacy field wins,
               * with `align` as the fallback. */
              vAlign: image?.align ?? align,
              link: {
                buttons,
                colorNeutral: colorNeutral,
                arrangement: textAlign,
              },
              headline: {
                text: headline,
                level: "h2",
                style: highlightText === true ? "h1" : undefined,
                sub: sub,
                spaceAfter: highlightText === true ? "large" : undefined,
                align: textAlign,
              },
            }}
            ks-inverted={inverted ? "true" : undefined}
          />
        </Container>
      </ButtonContext.Provider>
    );
  }
);

export const CtaContext = createContext(CtaContextDefault);
export const Cta = forwardRef<
  HTMLDivElement,
  CtaProps & HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const Component = useContext(CtaContext);
  return <Component {...deepMergeDefaults(defaults, props)} ref={ref} />;
});
Cta.displayName = "Cta";
