import announcementService from "../services/announcementService";


const getAnnouncements = async () => {
  announcementService.fetchData()
    .then((res) => {
      if (!res) {
        if (!res.status === 200) {
          throw new Error("Failed to get announcements");
        }
      }
      else {
        return res.data.array;
      }
    });
};

const AnnouncementAdapter = {
  getAnnouncements,
};


export default AnnouncementAdapter;