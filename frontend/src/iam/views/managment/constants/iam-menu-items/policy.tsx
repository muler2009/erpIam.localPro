import SelectResourceForPolicyCreation from "../../policy/policy-mini-component/SelectResourceForPolicyCreation"

export const new_policy_tab_attribute = [
    { 
        label: "Visual / GUI",
        total: true,
        tabContent: <SelectResourceForPolicyCreation />,
      },
      { 
        label: "JSON",
        tabContent: <h1>TabCOntent2</h1>,
        total: false
      }


]