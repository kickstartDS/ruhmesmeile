import classnames from "classnames";
import React from "react";
import PrompterSectionInput from "../prompter-section-input/PrompterSectionInput";

interface PrompterSelectionDisplayProps {
  text: string;
  children?: React.ReactNode;
}

const PrompterSelectionDisplay: React.FC<PrompterSelectionDisplayProps> = ({
  text,
  children,
}) => {
  return (
    <PrompterSectionInput>
      <div className={classnames("prompter-selection-display", {})}>
        <span className="prompter-selection-display__text">{text}</span>
        {children}
      </div>
    </PrompterSectionInput>
  );
};

export default PrompterSelectionDisplay;
