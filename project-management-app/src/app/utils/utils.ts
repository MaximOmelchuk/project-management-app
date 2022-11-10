import moment from "moment";
import { setToken } from "../store/reducers/commonSlice";
import { getExpirationDate, isExpired } from "./tokenUtils";

// export function findItem(objArr, objProp, value) {
//   return objArr.find((item) => item[objProp] === value);
// }

// export function cellDate(row, fild) {
//   const { original } = row;
//   const date = moment(original[fild]);
//   return date.isValid() ? date.format('DD.MM.YYYY') : '';
// }

export function formatDate(data) {
  const date = moment(data);
  return date.isValid() ? date.format("YYYY-MM-DD") : "";
}

export function redirect(err, dispatch) {
  if (isExpired(getExpirationDate(localStorage.getItem("itVPN_refresh_token"))))
    dispatch(setToken(null));
  // if (
  //   err.error.originalStatus === 403 ||
  //   err.error.originalStatus === 302 ||
  //   err.meta.response.redirected
  // )
  //   // window.location.href = '/license-manager/login/';
  //   window.location.href = '/login/';
}

export function formatMounth(data) {
  const date = moment(data);
  return date.isValid() ? date.format("MM-YYYY") : "";
}

export function formatDateHour(data) {
  const date = moment(data);
  return date.isValid() ? date.format("YYYY-MM-DD HH:mm") : "";
}

export function formatHour(data) {
  const date = moment(data);
  return date.isValid() ? date.format("HH:mm") : "";
}

export function formatYear(data) {
  const date = moment(data);
  return date.isValid() ? date.format("YYYY") : "";
}

export function cellHour(data) {
  const time = moment(data, "HH:mm:ss").utcOffset(data);
  return time.isValid() ? time.format("HH:mm:ss") : "";
}

export function cellDate(data) {
  const date = moment(data).utcOffset(data);
  return date.isValid() ? date.format("DD.MM.YYYY HH:mm") : "";
}

export function paramsToString(params, isHavePoint) {
  if (!params.ordering || params.ordering === "undefined")
    delete params.ordering;
  if (!params.full || params.full === "undefined") delete params.full;

  return Object.keys(params)
    .map((item) => {
      const isNumber = !isNaN(params[item]?.toString().replaceAll(",", "."));
      const par_result = params[item]?.toString();
      if (!params[item]) return "";
      // ~params[item]?.toString().replace('.', '_').indexOf('name_nom_card') ||
      // ~params[item]?.toString().replace('.', '_').indexOf('product_card_name')
      //   ? `${params[item]?.toString().replace('.', '_')},${params[item]
      //       ?.toString()
      //       .replace('.', '_')
      //       .replace('product_card_name', 'product_card_short_name')
      //       .replace('name_nom_card', 'short_name')}`
      //   : params[item]?.toString().replace('.', '_');
      return `${isHavePoint ? item : item.replaceAll(".", "_")}=${
        isNumber ? params[item]?.toString().replace(",", ".") : par_result
      }`;
    })
    .join("&");
}

// ordering=base_nom_card_name_nom_card,nom_card_short_name

export function filterArrayToObject(arr) {
  const obj = {};
  arr.forEach((item) => {
    if (
      item.value.toString()?.indexOf("gt_") !== -1 ||
      item.value.toString()?.indexOf("lt_") !== -1
    ) {
      const [flag, value] = item.value.split("_");
      obj[`${item.id}_${flag}`] =
        item.id.toString()?.indexOf("bytes_") !== -1
          ? Math.ceil(value * 1024 * 1024)
          : value;
    } else obj[item.id] = item.value;
  });
  return obj;
}

export const objectToString = (object) => {
  return JSON.stringify(object);
};

export const objectFromString = (string) => {
  return JSON.parse(string);
};

export const makeCellsProps = (cells) => {
  return cells.map((cell) => {
    if (cell.Header === "ID")
      return {
        ...cell,
        width: 55,
        minWidth: 55,
        maxWidth: 200,
        disableFilters: true,
      };
    if (cell.Header?.includes("дата")) return { ...cell, width: 90 };
    return cell;
  });
};

export const swapArrayElements = (a, x, y) => {
  if (a.length === 1) return a;
  a.splice(y, 1, a.splice(x, 1, a[y])[0]);
  return a;
};

export const setInputOnFocus = (rowId, cellId, isAloneInput, event) => {
  const input = cellId
    ? document.getElementById(cellId)
    : event.target
        .closest("TABLE")
        ?.querySelector(
          `#EditableCell-${rowId}-${isAloneInput ? "alone" : "first"}`
        );
  if (!window.getSelection().toString()) input?.focus();
};

export const setTableOnFocus = (datafocus, isDocLine) => {
  if (isDocLine) document.querySelector(`[datafocus=${datafocus}]`)?.focus();
  else {
    const tables = document.querySelectorAll("[datafocus=autoFocus]");
    tables[tables.length - 1]?.focus();
  }
};
