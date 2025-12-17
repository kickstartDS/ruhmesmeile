import classnames from "classnames";
import React from "react";
import PrompterHeadline from "../prompter-headline/PrompterHeadline";

interface PrompterSectionProps {
  children: React.ReactNode;
  headline?: string;
  text?: string;
}

const PrompterSection: React.FC<PrompterSectionProps> = ({ children }) => {
  return (
    <div className={classnames("prompter-section-input")}>
      {children && <div className="prompter-section-input">{children}</div>}
    </div>
  );
};

export default PrompterSection;
