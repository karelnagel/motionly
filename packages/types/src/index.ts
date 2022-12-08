import { CompProps } from "./components";

export * from "./defaults/image"
export * from "./defaults/components"
export * from "./components"
export * from "./sdk"
export interface SizeProps {
    width: number,
    height: number
}
export type VideoInput = {
    modifications?: CompProps[];
} & (
        | {
            local: true;
            components: CompProps[];
            height: number;
            width: number;
            duration: number;
            fps: number;
        }
        | { id: string; local: false }
    );
export type TemplateType = {
    id: string
    width: number
    height: number
    duration: number
    fps: number
    components: CompProps[]

}