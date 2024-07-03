import { useGetGroupsQuery } from "../features/groupsAPI"

export interface ResourceNotifierInterface {
    label: string,
    data: number
}

const resources: ResourceNotifierInterface[] = [
    { label: "Users", data: 5 },
    { label: "Groups", data: 5 },
    { label: "Roles",  data: 5 },
    { label: "SubGroups", data: 5},
    { label: "Policies", data: 5 }
]
  