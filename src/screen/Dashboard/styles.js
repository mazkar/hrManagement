import { StyleSheet, Platform } from "react-native";
import { COLORS, FONTS } from "../../assets/theme/index";

const styles = StyleSheet.create({
  container: { flex: 1 },
  btmNav: { height: 95 },
  btnContiner: { flexDirection: "row", justifyContent: "flex-end" },
  ceklisButton: {
    width: 106.33,
    marginTop: 15,
    marginRight: 31.67,
  },

  // header
  header: {
    height: 90,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 11.76,
    backgroundColor: COLORS.WHITE,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userData: { alignItems: "center", flexDirection: "row" },
  avatar: {
    width: 47,
    height: 47,
    marginRight: 9.5,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: COLORS.WHITE,
  },
  txt1: {
    fontSize: FONTS.v14,
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
    color: COLORS.DARK,
    marginBottom: 4,
  },
  txt2: {
    fontSize: FONTS.v14,
    fontWeight: Platform.OS === "ios" ? "400" : "normal",
    color: COLORS.GRAY_HARD,
  },
  txt3: {
    fontSize: FONTS.v13,
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
    textAlign: "right",
    color: COLORS.DARK,
  },
  txt4: {
    fontSize: FONTS.v13,
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
    textAlign: "right",
    color: COLORS.GRAY_HARD,
  },
  txt5: {
    fontSize: FONTS.v16,
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
    textAlign: "right",
    color: COLORS.PRIMARY_MEDIUM,
  },

  // konten card
  card: {
    paddingHorizontal: 8,
    paddingVertical: 20,
    marginHorizontal: 12,
    borderRadius: 8,
    height: 426,
    elevation: 2,
    backgroundColor: COLORS.WHITE,
  },
  cardHeader: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContiner: {
    alignItems: "center",
    flexDirection: "row",
  },
  icoTitle: { width: 20, height: 20, marginRight: 5 },
  txtTitle: {
    fontSize: FONTS.v18,
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
    color: COLORS.DARK,
    marginLeft: 5,
  },
  txtSeeAll: {
    fontSize: FONTS.v13,
    fontWeight: "400",
    color: COLORS.DARK,
    marginRight: 4,
  },

  //
  surveyProgres: {
    marginTop: 16,
    marginBottom: 20,
    flex: 1,
    flexDirection: "row",
  },

  //survey
  survey: { marginBottom: 20 },
  itemSurvey: { marginBottom: 5, borderWidth: 1, borderColor: COLORS.GRAY_SOFT },
});

export default styles;
