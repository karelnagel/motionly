import { MapProps } from "@motionly/base";
import {
  ColorInput,
  NumberInput,
  TextInput,
} from "../../../../../../components/inputs";
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
        label="Src"
        value={comp.src}
        onChange={(src) => setComp({ ...comp, src })}
      />
      <NumberInput
        label="Latitude (deg)"
        value={comp.lat}
        onChange={(lat) => setComp({ ...comp, lat })}
      />
      <NumberInput
        label="Longitude (deg)"
        value={comp.lng}
        onChange={(lng) => setComp({ ...comp, lng })}
      />
      <NumberInput
        label="Zoom"
        value={comp.zoom}
        onChange={(zoom) => setComp({ ...comp, zoom })}
      />
      <ColorInput
        label="Stroke"
        value={comp.stroke}
        onChange={(stroke) => setComp({ ...comp, stroke })}
      />
      {comp.stroke && (
        <NumberInput
          label="Stroke Width (px)"
          value={comp.strokeWidth}
          onChange={(strokeWidth) => setComp({ ...comp, strokeWidth })}
        />
      )}
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
      <ColorInput
        label="Marker"
        value={comp.markerColor}
        onChange={(markerColor) =>
          setComp({
            ...comp,
            markerColor,
          })
        }
      />
      {comp.markerColor && (
        <NumberInput
          label="Marker Size (px)"
          value={comp.markerSize}
          onChange={(markerSize) =>
            setComp({
              ...comp,
              markerSize,
            })
          }
        />
      )}
    </EditSection>
  );
};
