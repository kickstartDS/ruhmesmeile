import { FC, PropsWithChildren, forwardRef, useContext } from "react";
import { SectionContext } from "@kickstartds/ds-agency-premium/section";
import { HeadlineLevelProvider } from "../headline/HeadlineLevelContext";

export const SectionProvider: FC<PropsWithChildren<any>> = (props) => {
  const PrevSection = useContext(SectionContext);
  // eslint-disable-next-line react/display-name
  const Section = forwardRef<HTMLDivElement, any>(({ aiDraft, ...props }, ref) => (
    <HeadlineLevelProvider>
      <PrevSection {...props} ref={ref} data-ai-draft={aiDraft} />
    </HeadlineLevelProvider>
  ));
  return <SectionContext.Provider {...props} value={Section} />;
};
