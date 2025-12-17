import { forwardRef } from "react";
import { SelectField } from "@kickstartds/form/lib/select-field";
import { Icon } from "@kickstartds/base/lib/icon";
import PrompterSectionInput from "../prompter-section-input/PrompterSectionInput";

export const PrompterSelectField = forwardRef<HTMLSelectElement>(
  (props, ref) => {
    return (
      <PrompterSectionInput>
        <div className="prompter-select-field">
          <SelectField ref={ref} {...props} hideLabel />
          <Icon className="prompter-select-field__icon" icon="triangle-down" />
        </div>
      </PrompterSectionInput>
    );
  }
);

PrompterSelectField.displayName = "PrompterSelectField";
