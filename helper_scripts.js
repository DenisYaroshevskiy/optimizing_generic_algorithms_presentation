
/*
 * Copyright 2019 Denis Yaroshevskiy
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function transformMeasurementURLs(filter, benchDescription, type) {
  console.log(type);
  benchDescription.general.title =
    benchDescription.general.title.replace('{}', type);
  benchDescription.measurements =
    benchDescription.measurements.filter((m) => {
      if (filter.indexOf(m.name) !== -1) return true;
      if (benchDescription.general.baseline) {
        return m.name == benchDescription.general.baseline;
      }
      return false;
    });
  benchDescription.measurements = benchDescription.measurements.map(
    (m) => {
      m.url = ALGORITHM_DUMPSTER_URL + m.url.replace('{}', type);
      return m;
    }
  );
  return benchDescription;
}

async function visualizeTimings(divId, template, types, filter) {
  visualizeBecnhmarksForTypes(divId, template, types,
    (benchDescription, type) => {
      return transformMeasurementURLs(filter, benchDescription, type);
    });
}
