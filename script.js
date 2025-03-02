document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("trip-form");
    const tripList = document.getElementById("trip-list");
    const totalSpan = document.getElementById("total");
    const resetBtn = document.getElementById("reset-btn");

    let totalHarga = 0;
    let trips = JSON.parse(localStorage.getItem("trips")) || [];

    function saveToLocalStorage() {
        localStorage.setItem("trips", JSON.stringify(trips));
        localStorage.setItem("totalHarga", totalHarga);
    }

    function renderTrips() {
        tripList.innerHTML = "";
        totalHarga = parseInt(localStorage.getItem("totalHarga")) || 0;
        totalSpan.textContent = `Rp ${totalHarga.toLocaleString()}`;

        // Tambahkan efek perubahan warna
        totalSpan.style.color = "aquamarine";

        trips.forEach(trip => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${trip.tanggal}</td>
                <td>${trip.hari}</td>
                <td>${trip.jenis}</td>
                <td>${trip.driver}</td>
                <td>${trip.waktu}</td>
                <td>Rp ${trip.harga.toLocaleString()}</td>
            `;
            tripList.appendChild(row);
        });
    }

    renderTrips();

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const tanggal = document.getElementById("tanggal").value;
        const hari = document.getElementById("hari").value;
        const jenis = document.getElementById("jenis").value;
        const driver = document.getElementById("driver").value;
        const waktu = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

        if (!tanggal || !hari || !jenis || !driver) {
            alert("Harap isi semua data sebelum menambahkan perjalanan!");
            return;
        }

        const harga = jenis === "pulang" ? 20000 : 15000;

        totalHarga += harga;

        const newTrip = { tanggal, hari, jenis, driver, waktu, harga };
        trips.push(newTrip);
        saveToLocalStorage();
        renderTrips();

        form.reset();
    });

    resetBtn.addEventListener("click", function () {
        localStorage.removeItem("trips");
        localStorage.removeItem("totalHarga");
        trips = [];
        totalHarga = 0;
        renderTrips();
    });
});
