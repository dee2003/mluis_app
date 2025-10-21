// import React, { useEffect, useState, useMemo } from 'react';
// import {
//   View,
//   Text,
//   SectionList,
//   StyleSheet,
//   ActivityIndicator,
//   RefreshControl,
//   SafeAreaView,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import apiClient from '../../api/apiClient';
// import { useNavigation } from '@react-navigation/native';

// // ✅ Centralized color palette
// const COLORS = {
//   primary: '#007AFF',
//   background: '#F2F2F7',
//   card: '#FFFFFF',
//   textPrimary: '#1C1C1E',
//   textSecondary: '#636366',
//   border: '#E5E5EA',
// };

// type ItemType = {
//   date: string;
//   foreman_id: number;
//   foreman_name: string;
//   job_code: string;
//   timesheet_count: number;
//   ticket_count: number;
// };

// // ✅ Dashboard component
// const PEDashboard = () => {
//   const navigation = useNavigation();
//   const [data, setData] = useState<ItemType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   // Fetch dashboard data
//   const loadDashboard = async () => {
//     try {
//       setLoading(true);
//       const res = await apiClient.get('/api/review/pe/dashboard');
//       setData(res.data);
//     } catch (error: any) {
//       console.error('Failed to load PE data:', error);
//       Alert.alert('Error', error.response?.data?.detail || 'Failed to load data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadDashboard();
//   }, []);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await loadDashboard();
//     setRefreshing(false);
//   };

//   // ✅ Group data by date using useMemo
//   const sections = useMemo(() => {
//     const grouped = data.reduce<Record<string, ItemType[]>>((acc, item) => {
//       (acc[item.date] = acc[item.date] || []).push(item);
//       return acc;
//     }, {});

//     return Object.entries(grouped).map(([date, entries]) => ({
//       title: date,
//       data: entries,
//     }));
//   }, [data]);

//   // ✅ Loading state
//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color={COLORS.primary} />
//       </View>
//     );
//   }

//   // ✅ UI
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Project Engineer Dashboard</Text>
//       </View>

//       <SectionList
//         sections={sections}
//         keyExtractor={(item) => `${item.foreman_id}-${item.date}`}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//         renderSectionHeader={({ section }) => (
//           <View style={styles.dateHeader}>
//             <Text style={styles.dateText}>
//               {new Date(section.title + 'T00:00:00').toLocaleDateString()}
//             </Text>
//           </View>
//         )}
//         renderItem={({ item }) => (
//           <View style={styles.itemContainer}>
//             <View style={styles.itemHeader}>
//               <Ionicons name="person-circle-outline" size={20} color={COLORS.textPrimary} />
//               <Text style={styles.foremanName}>{item.foreman_name}</Text>
//             </View>
//             <Text style={styles.jobCode}>Job Code: {item.job_code || 'N/A'}</Text>

//             <View style={styles.row}>

//              <TouchableOpacity
//   onPress={() =>
//     (navigation as any).navigate('PETimesheetList', {
//       foremanId: item.foreman_id,
//       date: item.date,
//       foremanName: item.foreman_name,
//     })
//   }
// >
//   <Text style={styles.linkText}>Timesheets ({item.timesheet_count})</Text>
// </TouchableOpacity>

// <TouchableOpacity
//   onPress={() =>
//     (navigation as any).navigate('PETicketList', {
//       foremanId: item.foreman_id,
//       date: item.date,
//       foremanName: item.foreman_name,
//     })
//   }
// >
//   <Text style={styles.linkText}>Tickets ({item.ticket_count})</Text>
// </TouchableOpacity>

//             </View>
//           </View>
//         )}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Ionicons name="file-tray-outline" size={60} color={COLORS.border} />
//             <Text style={styles.emptyText}>No Submitted Data</Text>
//           </View>
//         }
//       />
//     </SafeAreaView>
//   );
// };

// // ✅ Styles
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background },
//   centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   header: {
//     backgroundColor: COLORS.card,
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.border,
//   },
//   headerTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.textPrimary },
//   dateHeader: { backgroundColor: '#e9ecef', padding: 10 },
//   dateText: { fontSize: 17, fontWeight: '700', color: '#495057' },
//   itemContainer: {
//     backgroundColor: COLORS.card,
//     margin: 10,
//     padding: 12,
//     borderRadius: 8,
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   itemHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
//   foremanName: { fontSize: 17, fontWeight: '600', marginLeft: 6 },
//   jobCode: { fontSize: 15, color: COLORS.textSecondary, marginBottom: 6 },
//   row: { flexDirection: 'row', justifyContent: 'space-between' },
//   linkText: { color: COLORS.primary, fontWeight: '600' },
//   emptyContainer: { alignItems: 'center', marginTop: 80 },
//   emptyText: { fontSize: 16, color: COLORS.textSecondary, marginTop: 10 },
// });

// export default PEDashboard;






import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import apiClient from '../../api/apiClient';
import { useNavigation } from '@react-navigation/native';

const COLORS = {
  primary: '#007AFF',
  background: '#F2F2F7',
  card: '#FFFFFF',
  textPrimary: '#1C1C1E',
  textSecondary: '#636366',
  border: '#E5E5EA',
};

type ItemType = {
  date: string;
  foreman_id: number;
  foreman_name: string;
  supervisor_name: string;
  job_code: string;
  timesheet_count: number;
  ticket_count: number;
};

const PEDashboard = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/api/review/pe/dashboard');
      setData(res.data);
    } catch (error: any) {
      console.error('Failed to load PE data:', error);
      Alert.alert('Error', error.response?.data?.detail || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboard();
    setRefreshing(false);
  };

  // Group data by date
  const sections = useMemo(() => {
    const grouped = data.reduce<Record<string, ItemType[]>>((acc, item) => {
      (acc[item.date] = acc[item.date] || []).push(item);
      return acc;
    }, {});

    return Object.entries(grouped).map(([date, entries]) => ({
      title: date,
      data: entries,
    }));
  }, [data]);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          // 🔹 Replace this with your actual logout logic
          Alert.alert('Logged out', 'You have been logged out successfully.');
          (navigation as any).reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔹 Top bar with short heading and logout button */}
      <View style={styles.topBar}>
        <Text style={styles.heading}>PE Dashboard</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={26} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => `${item.foreman_id}-${item.date}`}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderSectionHeader={({ section }) => (
          <View style={styles.dateHeader}>
            <Text style={styles.dateText}>
              {new Date(section.title + 'T00:00:00').toLocaleDateString()}
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Ionicons name="person-circle-outline" size={20} color={COLORS.textPrimary} />
              <Text style={styles.foremanName}>{item.supervisor_name}</Text>

            </View>
            <Text style={styles.jobCode}>Job Code: {item.job_code || 'N/A'}</Text>

            <View style={styles.row}>
              <TouchableOpacity
                onPress={() =>
                  (navigation as any).navigate('PETimesheetList', {
                    foremanId: item.foreman_id,
                    date: item.date,
                    foremanName: item.foreman_name,
                  })
                }
              >
                <Text style={styles.linkText}>Timesheets ({item.timesheet_count})</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  (navigation as any).navigate('PETicketList', {
                    foremanId: item.foreman_id,
                    date: item.date,
                    foremanName: item.foreman_name,
                  })
                }
              >
                <Text style={styles.linkText}>Tickets ({item.ticket_count})</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="file-tray-outline" size={60} color={COLORS.border} />
            <Text style={styles.emptyText}>No Submitted Data</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },

  dateHeader: { backgroundColor: '#e9ecef', padding: 10 },
  dateText: { fontSize: 17, fontWeight: '700', color: '#495057' },

  itemContainer: {
    backgroundColor: COLORS.card,
    margin: 10,
    padding: 12,
    borderRadius: 8,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  foremanName: { fontSize: 17, fontWeight: '600', marginLeft: 6 },
  jobCode: { fontSize: 15, color: COLORS.textSecondary, marginBottom: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  linkText: { color: COLORS.primary, fontWeight: '600' },
  emptyContainer: { alignItems: 'center', marginTop: 80 },
  emptyText: { fontSize: 16, color: COLORS.textSecondary, marginTop: 10 },
});

export default PEDashboard;
