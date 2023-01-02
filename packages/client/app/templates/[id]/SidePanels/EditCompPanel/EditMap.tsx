import { MapProps } from "@asius/types";
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
        value={comp.mapUrl}
        onChange={(mapUrl) => setComp({ ...comp, mapUrl })}
      />
      <NumberInput
        label="Latitude"
        value={comp.location.lat}
        onChange={(lat) =>
          setComp({ ...comp, location: { ...comp.location, lat } })
        }
      />
      <NumberInput
        label="Longitude"
        value={comp.location.lng}
        onChange={(lng) =>
          setComp({ ...comp, location: { ...comp.location, lng } })
        }
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
      {comp.marker ? (
        <>
          <p className="">Marker</p>
          <button onClick={() => setComp({ ...comp, marker: undefined })}>
            Remove
          </button>
          <NumberInput
            label="size"
            value={comp.marker.size}
            onChange={(size) =>
              setComp({
                ...comp,
                marker: { ...comp.marker, size },
              })
            }
          />
          <ColorInput
            label="color"
            value={comp.marker.color}
            onChange={(color) =>
              setComp({
                ...comp,
                marker: { ...comp.marker, color },
              })
            }
          />
        </>
      ) : (
        <button onClick={() => setComp({ ...comp, marker: {} })}>
          Add Marker
        </button>
      )}
    </EditSection>
  );
};
