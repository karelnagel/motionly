export * from "./defaults/image"
export * from "./defaults/components"

// BASE
export const CompAnimationTypes = {
    "opacity": "Opacity",
    "scale": "Scale",
    "translateX": "Translate X",
    "translateY": "Translate Y",
    "rotate": "Rotate",
    "skew": "Skew"
}
export interface CompAnimationProps {
    type: keyof typeof CompAnimationTypes
    from: number,
    to: number,
    start: number
    end: number
}
export interface BaseCompProps {
    id: string
    height: number
    width: number
    x: number
    y: number
    borderRadius: number
    rotation: number
    from: number
    duration: number
    componentAnimations?: CompAnimationProps[]
}


// TEXT
export const TextAlign = {
    "left": "Left",
    "center": "Center",
    "right": "Right"
}
export interface TextStyle {
    fontSize?: number
    fontFamily?: string
    fontWeight?: number
    lineHeight?: number
    textAlign?: keyof typeof TextAlign
    backgroundColor?: string
    color?: string;
    outline?: {
        color: string
        width: number
    }
}
export const TextAnimationTypes = {
    "word-by-word": "Word by word",
    "letter-by-letter": "Letter by letter",
    "line-by-line": "Line by line",
}
export const TextAnimationAnimations = {
    "fade-in": "Fade in",
    "slide-up": "Slide up",
    "slide-down": "Slide down",
    "slide-left": "Slide left",
    "slide-right": "Slide right",
    "scale": "Scale"
}
export interface TextAnimation {
    type: keyof typeof TextAnimationTypes
    duration: number
    animation: keyof typeof TextAnimationAnimations
}
export interface TextCompProps extends BaseCompProps {
    type: "text"
    textStyle: TextStyle
    text: string
    animation?: TextAnimation
}


// TRANSCRIPTION
export const TranscriptionAnimationTypes = {
    "current-word": "Current word",
    "current-line": "Current line",
    "previous-text": "Previous text",
}
export interface TranscriptionWord {
    text: string
    start: number
    end: number
}
export const TranscriptionScrollType = {
    "page-by-page": "Page by page",
    "line-by-line": "Line by line",
}
export interface TranscriptionAnimation {
    type: keyof typeof TranscriptionAnimationTypes
    textStyle: TextStyle
}
export interface TranscriptionCompProps extends BaseCompProps {
    type: "transcription"
    words: TranscriptionWord[]
    textStyle: TextStyle
    scrollType: keyof typeof TranscriptionScrollType
    animation: TranscriptionAnimation
}

// IMAGE & VIDEO 
export const ObjectFit = {
    cover: "cover",
    contain: "contain",
    fill: "fill",
    none: "none",
    "scale-down": "scale-down"
}
export type ObjectFitType = keyof typeof ObjectFit

export interface ImageCompProps extends BaseCompProps {
    type: "image"
    src: string
    objectFit: ObjectFitType
}

export interface VideoCompProps extends BaseCompProps {
    type: "video"
    src: string
    objectFit: ObjectFitType
    startFrom?: number
    muted?: boolean
    volume?: number
    offthread?: boolean
}

// AUDIOGRAM
export const AudiogramPosition = {
    top: "Top",
    bottom: "Bottom",
    center: "Center",
}
export interface AudiogramCompProps extends BaseCompProps {
    type: "audiogram"
    src: string
    position: keyof typeof AudiogramPosition
    gap: number
    barWidth: number
    color: string
    roundness: number
    startFrom: number
}


// AUDIO
export interface AudioCompProps extends BaseCompProps {
    type: "audio"
    src: string
    volume: number
    startFrom: number
}


// MOCKUP
export const MockupTypes = {
    iPhone: "iPhone",
    chrome: "Chrome",
    macbook: "Macbook",
    iPad: "iPad",
    "apple-watch": "Apple Watch",
    "vs-code": "VS Code",
}
export interface MockupCompProps extends BaseCompProps {
    type: "mockup"
    children: CompProps[]
    mockupType: keyof typeof MockupTypes
}

// MAP
export interface MapCompProps extends BaseCompProps {
    type: "map",
    location: {
        lat: number
        lng: number
    }
    zoom: number
    color: string
    backgroundColor: string
    animation: {
        from: number
        to: number
        start: number
        end: number
    }
}


// GRAPH
export const GraphTypes = {
    "line": "Line",
    "bar": "Bar",
    "pie": "Pie",
}
export interface GraphCompProps extends BaseCompProps {
    type: "graph",
    values: number[]
    color: string
    graphType: keyof typeof GraphTypes
    animation: {
        start: number
        end: number
    }
}


// QR CODE
export interface QRCodeCompProps extends BaseCompProps {
    type: "qrcode",
    text: string,
    color: string,
    backgroundColor: string,
}


// PROGRESS BAR
export const ProgressBarTypes = {
    spotify: "Spotify",
    line: "Line",
    circle: "Circle",
    square: "Square",
}
export interface ProgressBarCompProps extends BaseCompProps {
    type: "progressbar",
    from: number
    to: number
    progressBarType: keyof typeof ProgressBarTypes
}


// DIV
export interface DivCompProps extends BaseCompProps {
    type: "div"
    backgroundColor?: string
    children: CompProps[]
}


export type CompProps = TextCompProps | ImageCompProps | DivCompProps | VideoCompProps | AudioCompProps | AudiogramCompProps | TranscriptionCompProps | MockupCompProps | MapCompProps | GraphCompProps | QRCodeCompProps | ProgressBarCompProps
