import { MapProps } from "@asius/components";
import {
  ColorInput,
  NumberInput,
  TextInput,
} from "../../../../../components/inputs";
import { EditSection } from "./EditSection";
import { SetComp } from "./index";

export const EditMap = ({
  comp,
  setComp,
}: {
  comp: MapProps;
  setComp: SetComp;
}) => {
  return (
    <EditSection title="Map">
      <TextInput
        label="Url"
        value={comp.url}
        onChange={(url) => setComp({ ...comp, url })}
      />
      <NumberInput
        label="Latitude"
        value={comp.lat}
        onChange={(lat) => setComp({ ...comp, lat })}
      />
      <NumberInput
        label="Longitude"
        value={comp.lng}
        onChange={(lng) => setComp({ ...comp, lng })}
      />
      <NumberInput
        label="Zoom"
        value={comp.zoom}
        onChange={(zoom) => setComp({ ...comp, zoom })}
      />
      <NumberInput
        label="Width"
        value={comp.strokeWidth}
        onChange={(strokeWidth) => setComp({ ...comp, strokeWidth })}
      />
      <ColorInput
        label="Stroke"
        value={comp.stroke}
        onChange={(stroke) => setComp({ ...comp, stroke })}
      />
      <ColorInput
        label="Fill"
        value={comp.fill}
        onChange={(fill) => setComp({ ...comp, fill })}
      />
      <ColorInput
        label="Background"
        value={comp.bg}
        onChange={(bg) => setComp({ ...comp, bg })}
      />
      <p className="">Marker</p>
      <NumberInput
        label="size"
        value={comp.markerSize}
        onChange={(markerSize) =>
          setComp({
            ...comp,
            markerSize,
          })
        }
      />
      <ColorInput
        label="color"
        value={comp.markerColor}
        onChange={(markerColor) =>
          setComp({
            ...comp,
            markerColor,
          })
        }
      />
    </EditSection>
  );
};
