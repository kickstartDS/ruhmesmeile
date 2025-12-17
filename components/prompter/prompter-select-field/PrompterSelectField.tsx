import { forwardRef } from "react";
import { SelectField } from "@kickstartds/form/lib/select-field";
import { Icon } from "@kickstartds/base/lib/icon";

export const PrompterSelectField = forwardRef<HTMLSelectElement>(
  (props, ref) => {
    return (
      <div className="prompter-select-field">
        <SelectField ref={ref} {...props} hideLabel />
        <Icon className="prompter-select-field__icon" icon="triangle-down" />
      </div>
    );
  }
);

PrompterSelectField.displayName = "PrompterSelectField";
