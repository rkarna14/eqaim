import { Steps } from "../types";

const JSONView = ({ data }: { data: Steps }) => {
  return (
    <div className="bg-blue-950 text-white p-4">
      {"{"}
      <div className="p-2">
        {Object.keys(data).map((key) => {
          return (
            <div key={key}>
              {key}:{JSON.stringify(data[key], null, 2)}
            </div>
          );
        })}
      </div>
      {"}"}
    </div>
  );
};

export default JSONView;
