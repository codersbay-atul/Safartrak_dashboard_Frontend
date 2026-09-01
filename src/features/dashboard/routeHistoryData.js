export const DUMMY_MAP_ROUTE = [
  [13.1182, 77.5784],
  [13.1126, 77.5851],
  [13.108, 77.588],
  [13.1007, 77.5963],
  [13.0924, 77.5948],
  [13.0815, 77.592],
  [13.0722, 77.5891],
  [13.0624, 77.5878],
  [13.0541, 77.5886],
  [13.0488, 77.5895],
  [13.0416, 77.5904],
  [13.0352, 77.5912],
  [13.0338, 77.5984],
  [13.0384, 77.6072],
  [13.041, 77.605],
  [13.0448, 77.6126],
  [13.0465, 77.619],
  [13.0431, 77.6142],
  [13.0412, 77.6084],
  [13.0384, 77.6021],
  [13.0358, 77.597],
];

export const DUMMY_ROUTE_HISTORY_SUMMARY = {
  distance: "93.55 km",
  runningTime: "Running (04 hrs : 16 min)",
  stopCount: 13,
  stoppedTime: "(10 hrs : 26 min)",
};

export const DUMMY_ROUTE_HISTORY_EVENTS = [
  {
    id: "rh-stop-13",
    kind: "stop",
    stopNumber: 13,
    title: "Stop 13",
    duration: "1 hrs : 7 min",
    address:
      "79, 43 m from maruti suzuki arena varun motors, mbt road, hebbal kempegowda layout, hebbal, bengaluru, karnataka 560024, india",
    timeRange: "1 Sep 1:36 pm - 1 Sep 2:43 pm",
    lat: 13.0358,
    lng: 77.597,
    routePath: [
      [13.0465, 77.619],
      [13.0412, 77.6084],
      [13.0358, 77.597],
    ],
  },
  {
    id: "rh-run-13",
    kind: "run",
    title: "Ran for",
    duration: "29 min : 32 sec",
    distance: "9.47 KMS",
    timeRange: "1 Sep 1:06 pm - 1 Sep 1:36 pm",
  },
  {
    id: "rh-stop-12",
    kind: "stop",
    stopNumber: 12,
    title: "Stop 12",
    duration: "42 min : 18 sec",
    address:
      "12, 120 m from manyata tech park, nagawara, outer ring road, bengaluru, karnataka 560045, india",
    timeRange: "1 Sep 12:24 pm - 1 Sep 1:06 pm",
    lat: 13.0465,
    lng: 77.619,
    routePath: [
      [13.0352, 77.5912],
      [13.041, 77.605],
      [13.0465, 77.619],
    ],
  },
  {
    id: "rh-run-12",
    kind: "run",
    title: "Ran for",
    duration: "18 min : 11 sec",
    distance: "6.12 KMS",
    timeRange: "1 Sep 12:06 pm - 1 Sep 12:24 pm",
  },
  {
    id: "rh-stop-11",
    kind: "stop",
    stopNumber: 11,
    title: "Stop 11",
    duration: "1 hrs : 4 min",
    address:
      "hebbal flyover service road, near baptist hospital, bengaluru, karnataka 560024, india",
    timeRange: "1 Sep 11:02 am - 1 Sep 12:06 pm",
    lat: 13.0352,
    lng: 77.5912,
    routePath: [
      [13.0624, 77.5878],
      [13.0488, 77.5895],
      [13.0352, 77.5912],
    ],
  },
  {
    id: "rh-run-11",
    kind: "run",
    title: "Ran for",
    duration: "22 min : 08 sec",
    distance: "7.85 KMS",
    timeRange: "1 Sep 10:40 am - 1 Sep 11:02 am",
  },
  {
    id: "rh-stop-10",
    kind: "stop",
    stopNumber: 10,
    title: "Stop 10",
    duration: "15 min : 40 sec",
    address:
      "sahakara nagar main road, opposite to reliance digital, bengaluru, karnataka 560092, india",
    timeRange: "1 Sep 10:24 am - 1 Sep 10:40 am",
    lat: 13.0624,
    lng: 77.5878,
    routePath: [
      [13.1007, 77.5963],
      [13.0815, 77.592],
      [13.0624, 77.5878],
    ],
  },
  {
    id: "rh-run-10",
    kind: "run",
    title: "Ran for",
    duration: "31 min : 05 sec",
    distance: "11.20 KMS",
    timeRange: "1 Sep 9:53 am - 1 Sep 10:24 am",
  },
  {
    id: "rh-stop-9",
    kind: "stop",
    stopNumber: 9,
    title: "Stop 9",
    duration: "8 min : 22 sec",
    address:
      "yelahanka new town, near railway station, bengaluru, karnataka 560064, india",
    timeRange: "1 Sep 9:45 am - 1 Sep 9:53 am",
    lat: 13.1007,
    lng: 77.5963,
    routePath: [
      [13.115, 77.58],
      [13.108, 77.588],
      [13.1007, 77.5963],
    ],
  },
  {
    id: "rh-run-9",
    kind: "run",
    title: "Ran for",
    duration: "44 min : 16 sec",
    distance: "14.63 KMS",
    timeRange: "1 Sep 9:01 am - 1 Sep 9:45 am",
  },
];

export function getDummyMapStops() {
  return DUMMY_ROUTE_HISTORY_EVENTS.filter((event) => event.kind === "stop");
}
