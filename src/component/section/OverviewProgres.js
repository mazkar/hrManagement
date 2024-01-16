import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import styles from "../../screen/Dashboard/styles";
import { ICONS } from "../../assets/theme";
import { Chart } from "..";
import { Button, Divider } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import axios from "axios";

const OverviewProgres = ({
  dataChart,
  dataTaskDone,
  dataTaskInTransit,
  dataTaskPending,
}) => {
  // const [dataTaskPending, setDataTaskPending] = useState([]);
  // const [dataTaskInTransit, setDataTaskInTransit] = useState([]);
  // const [dataTaskDone, setDataTaskDone] = useState([]);
  const userId = useSelector((state) => state.auth.userId);
  // const [dataChart, setDataChart] = useState({});
  const token = useSelector((state) => state.auth.token);

  // async function getTask(userId) {
  //   try {
  //     let res = await axios({
  //       url: `https://flog-api.nsnebast.com/api/transportassignment/getPickupPending/${userId}`,
  //       method: "get",
  //       timeout: 8000,
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (res.status == 200) {
  //       // test for status you want, etc
  //       console.log(res.data, "meeeeeeeee");
  //       setDataTaskPending(res.data);
  //     }
  //     // Don't forget to return something
  //     return res.data;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // async function InTransit(userId) {
  //   try {
  //     let res = await axios({
  //       url: `https://flog-api.nsnebast.com/api/transportassignment/getInTransit/${userId}`,
  //       method: "get",
  //       timeout: 8000,
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (res.status == 200) {
  //       // test for status you want, etc
  //       console.log(res.data, "meeeeeeeee");
  //       setDataTaskInTransit(res.data);
  //     }
  //     // Don't forget to return something
  //     return res.data;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // async function Done(userId) {
  //   try {
  //     let res = await axios({
  //       url: `https://flog-api.nsnebast.com/api/transportassignment/getAssignmentCompleted/${userId}`,
  //       method: "get",
  //       timeout: 8000,
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (res.status == 200) {
  //       // test for status you want, etc
  //       console.log(res.data, "done");
  //       setDataTaskDone(res.data);
  //     }
  //     // Don't forget to return something
  //     return res.data;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // const { valueOpen, valueDone, valueTotal, surveyChart = [] } = props;
  // const survey = [
  //   {
  //     name: "Done",
  //     y: 1,
  //   },
  //   {
  //     name: "Open",
  //     y: 2,
  //   },
  //   {
  //     name: "Transit",
  //     y: 3,
  //   },
  // ];
  // console.log("data chart =>", surveyChart);

  // useEffect(() => {
  //   getTask(userId);

  //   InTransit(userId);

  //   Done(userId);
  // }, []);

  // useEffect(() => {
  //   setDataChart([
  //     {
  //       name: "Done",
  //       y: dataTaskDone?.length,
  //     },
  //     {
  //       name: "Open",
  //       y: dataTaskPending?.length,
  //     },
  //     {
  //       name: "Transit",
  //       y: dataTaskInTransit?.length,
  //     },
  //   ]);
  // }, [dataTaskPending, dataTaskDone, dataTaskInTransit]);

  return (
    <View style={styles.surveyProgres}>
      {/* <Button onPress={() => console.log(dataTaskDone, dataTaskInTransit, dataTaskPending)}>
        Test
      </Button> */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.titleContiner}>
            <Text style={styles.txtTitle}>Delivery Progress</Text>
          </View>
        </View>
        <Divider bold />
        {/* victory chart */}
        <Chart
          data={dataChart}
          surveyOpen={dataTaskPending}
          surveyDone={dataTaskDone}
          totalSurvey={dataTaskInTransit}
        />
      </View>
    </View>
  );
};

export default OverviewProgres;

