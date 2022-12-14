import { CompProps } from "./components";

export * from "./defaults/image"
export * from "./defaults/components"
export * from "./components"
export * from "./sdk"
export * from "./defaults"

export interface SizeProps {
    width: number,
    height: number
}
export type VideoInput = {
    modifications?: CompProps[];
} & (
        TemplateType

    );
export type TemplateType = {
    id?: string
    width: number
    height: number
    duration: number
    fps: number
    name?: string
    public?: boolean
    description?: string
    comps: CompProps[]

}
export interface EditableProps {
    select: (id: string) => void;
    selected: string;
    setComp: (comp: CompProps) => void;
    scale: number;
    lockAspectRatio: boolean;
}

export type ProgressStatus = "pending" | "rendering" | "done" | "error"
