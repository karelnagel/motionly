import { TemplateType, VideoInput } from "..";

export type RenderVideoInput = VideoInput
export type RenderVideoOutput = { renderId: string }

export type ProgressStatus = "pending" | "rendering" | "done" | "error"
export type GetProgressInput = { renderId: string }
export type GetProgressOutput = {
    progress: number
    cost: number
    status: ProgressStatus
    fileUrl: string
}

export type RenderImageInput = VideoInput & { frame: number }
export type RenderImageOutput = {
    fileUrl: string
    cost: number
    status: ProgressStatus
}

export type GetTemplateInput = { id: string }
export type GetTemplateOutput = TemplateType