import axios from "axios";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { Photo } from "../Home";
import { useMemo } from "react";
import moment from "moment";

export const usePhotos = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search");

  const { isLoading, isError, data, error } = useQuery<Photo[], Error>(
    "getphotos",
    () =>
      axios
        .get(`https://api.unsplash.com/photos`, {
          headers: {
            Authorization:
              "Client-ID wgSJ44ducmH1B_Re1Kcak8NynL_kBTSsKvEYBe5ye6k",
          },
        })
        .then((res) => res.data)
  );

  const searchResult = useMemo(() => {
    const fromDateUrl = searchParams.get("fromdate");
    const toDateUrl = searchParams.get("todate");

    let filteredData = data;
    if (searchTerm) {
      filteredData = filteredData?.filter((photo) => {
        return photo?.alt_description?.includes(searchTerm);
      });
    }
    if (fromDateUrl) {
      filteredData = filteredData?.filter((photo) => {
        return moment(photo?.created_at).isAfter(fromDateUrl);
      });
    }
    if (toDateUrl) {
      filteredData = filteredData?.filter((photo) => {
        return moment(photo?.created_at).isBefore(toDateUrl);
      });
    }
    return filteredData;
  }, [searchTerm, data, searchParams]);

  return { isLoading, isError, error, searchResult };
};
