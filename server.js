const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // Sirve archivos estáticos desde /public

const driversPath = path.join(__dirname, 'api', 'driver.json');
const vehiclesPath = path.join(__dirname, 'api', 'vehicle.json');
const teamsPath = path.join(__dirname, 'api', 'team.json');
const countriesPath = path.join(__dirname, 'api', 'country.json');
const powerUnitPath = path.join(__dirname, 'api', 'power-unit.json');

// GET: obtener todos los drivers
app.get('/api/drivers', (req, res) => {
    fs.readFile(driversPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error al leer los datos' });
        res.json(JSON.parse(data));
    });
});
// GET: obtener driver por id
app.get('/api/drivers/:id', (req, res) => {
    const driverId = parseInt(req.params.id);
    fs.readFile(driversPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error al leer los datos' });

        const drivers = JSON.parse(data);
        const driver = drivers.find(driver => driver.id === driverId);

        if (!driver) {
            return res.status(404).json({ error: 'Piloto no encontrado' });
        }

        res.json(driver);
    });
});

// POST: agregar un nuevo driver
app.post('/api/drivers', (req, res) => {
    fs.readFile(driversPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error al leer los datos' });

        let drivers = JSON.parse(data);
        const maxId = Math.max(...drivers.map(d => d.id), 0);
        const newDriver = { id: maxId + 1, ...req.body };

        drivers.push(newDriver);

        fs.writeFile(driversPath, JSON.stringify(drivers, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Error al guardar los datos' });
            res.json(newDriver);
        });
    });
});

// PUT: Actualizar un driver
app.put('/api/drivers/:id', (req, res) => {
    const driverId = parseInt(req.params.id);
    const updatedDriver = req.body;

    fs.readFile(driversPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error al leer los datos' });

        let drivers = JSON.parse(data);
        const index = drivers.findIndex(driver => driver.id === driverId);

        if (index === -1) {
            return res.status(404).json({ error: 'Piloto no encontrado' });
        }

        // Asegura que el ID no se sobrescriba accidentalmente
        drivers[index] = { ...drivers[index], ...updatedDriver, id: driverId };

        fs.writeFile(driversPath, JSON.stringify(drivers, null, 2), err => {
            if (err) return res.status(500).json({ error: 'Error al guardar los datos' });

            res.json(drivers[index]);
        });
    });
});
// DELETE: eliminar un driver
app.delete("/api/drivers/:id", (req, res) => {
    const driverId = parseInt(req.params.id);

    fs.readFile(driversPath, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error al leer los datos" });

        let drivers = JSON.parse(data);
        const index = drivers.findIndex((driver) => driver.id === driverId);

        if (index === -1) {
            return res.status(404).json({ error: "Piloto no encontrado" });
        }

        drivers.splice(index, 1); // Eliminar el piloto

        fs.writeFile(driversPath, JSON.stringify(drivers, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Error al guardar los cambios" });
            res.status(200).json({ message: "Piloto eliminado correctamente" });
        });
    });
});

// GET: obtener todos los teams
app.get('/api/teams', (req, res) => {
    fs.readFile(teamsPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error al leer los datos' });
        res.json(JSON.parse(data));
    });
});

// GET: obtener team por id
app.get('/api/teams/:id', (req, res) => {
    const teamId = parseInt(req.params.id);
    fs.readFile(teamsPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error al leer los datos' });

        const teams = JSON.parse(data);
        const team = teams.find(team => team.id === teamId);

        if (!team) {
            return res.status(404).json({ error: 'Piloto no encontrado' });
        }

        res.json(team);
    });
});

// POST: agregar un nuevo team
app.post('/api/teams', (req, res) => {
    fs.readFile(teamsPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error al leer los datos' });

        let teams = JSON.parse(data);
        const maxId = Math.max(...teams.map(d => d.id), 0);
        const newTeam = { id: maxId + 1, ...req.body };

        teams.push(newTeam);

        fs.writeFile(teamsPath, JSON.stringify(teams, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Error al guardar los datos' });
            res.json(newTeam);
        });
    });
});

// PUT: Actualizar un team
app.put('/api/teams/:id', (req, res) => {
    const teamId = parseInt(req.params.id);
    const updatedTeam = req.body;

    fs.readFile(teamsPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error al leer los datos' });

        let teams = JSON.parse(data);
        const index = teams.findIndex(team => team.id === teamId);

        if (index === -1) {
            return res.status(404).json({ error: 'Piloto no encontrado' });
        }

        // Asegura que el ID no se sobrescriba accidentalmente
        teams[index] = { ...teams[index], ...updatedTeam, id: teamId };

        fs.writeFile(teamsPath, JSON.stringify(teams, null, 2), err => {
            if (err) return res.status(500).json({ error: 'Error al guardar los datos' });

            res.json(teams[index]);
        });
    });
});
// DELETE: eliminar un team
app.delete("/api/teams/:id", (req, res) => {
    const teamId = parseInt(req.params.id);

    fs.readFile(teamsPath, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error al leer los datos" });

        let teams = JSON.parse(data);
        const index = teams.findIndex((team) => team.id === teamId);

        if (index === -1) {
            return res.status(404).json({ error: "Piloto no encontrado" });
        }

        teams.splice(index, 1); // Eliminar el piloto

        fs.writeFile(teamsPath, JSON.stringify(teams, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Error al guardar los cambios" });
            res.status(200).json({ message: "Piloto eliminado correctamente" });
        });
    });
});

app.get('/api/countries', (req, res) => {
    fs.readFile(countriesPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error al leer los datos' });
        res.json(JSON.parse(data));
    });
});

app.get('/api/vehicles', (req, res) => {
    fs.readFile(vehiclesPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error al leer los datos' });
        res.json(JSON.parse(data));
    });
});

// GET: obtener vehicle por id
app.get('/api/vehicles/:id', (req, res) => {
    const vehicleId = parseInt(req.params.id);
    fs.readFile(vehiclesPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error al leer los datos' });

        const vehicles = JSON.parse(data);
        const vehicle = vehicles.find(vehicle => vehicle.id === vehicleId);

        if (!vehicle) {
            return res.status(404).json({ error: 'Piloto no encontrado' });
        }

        res.json(vehicle);
    });
});

// POST: agregar un nuevo vehicle
app.post('/api/vehicles', (req, res) => {
    fs.readFile(vehiclesPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error al leer los datos' });

        let vehicles = JSON.parse(data);
        const maxId = Math.max(...vehicles.map(d => d.id), 0);
        const newDriver = { id: maxId + 1, ...req.body };

        vehicles.push(newDriver);

        fs.writeFile(vehiclesPath, JSON.stringify(vehicles, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Error al guardar los datos' });
            res.json(newDriver);
        });
    });
});

// PUT: Actualizar un vehicle
app.put('/api/vehicles/:id', (req, res) => {
    const vehicleId = parseInt(req.params.id);
    const updatedDriver = req.body;

    fs.readFile(vehiclesPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error al leer los datos' });

        let vehicles = JSON.parse(data);
        const index = vehicles.findIndex(vehicle => vehicle.id === vehicleId);

        if (index === -1) {
            return res.status(404).json({ error: 'Piloto no encontrado' });
        }

        // Asegura que el ID no se sobrescriba accidentalmente
        vehicles[index] = { ...vehicles[index], ...updatedDriver, id: vehicleId };

        fs.writeFile(vehiclesPath, JSON.stringify(vehicles, null, 2), err => {
            if (err) return res.status(500).json({ error: 'Error al guardar los datos' });

            res.json(vehicles[index]);
        });
    });
});
// DELETE: eliminar un vehicle
app.delete("/api/vehicles/:id", (req, res) => {
    const vehicleId = parseInt(req.params.id);

    fs.readFile(vehiclesPath, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error al leer los datos" });

        let vehicles = JSON.parse(data);
        const index = vehicles.findIndex((vehicle) => vehicle.id === vehicleId);

        if (index === -1) {
            return res.status(404).json({ error: "Piloto no encontrado" });
        }

        vehicles.splice(index, 1); // Eliminar el piloto

        fs.writeFile(vehiclesPath, JSON.stringify(vehicles, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Error al guardar los cambios" });
            res.status(200).json({ message: "Piloto eliminado correctamente" });
        });
    });
});

app.get('/api/power-unit', (req, res) => {
    fs.readFile(powerUnitPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error al leer los datos' });
        res.json(JSON.parse(data));
    });
});

// URLS
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'inicio.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'entrada.html'));
});
app.get('/admin/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'admin-entrada.html'));
});

app.get('/drivers', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'driver.html'));
});
app.get('/admin/drivers', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'admin-driver.html'));
});

app.get('/teams', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'teams.html'));
});
app.get('/admin/teams', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'admin-teams.html'));
});
app.get('/vehicles', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'vehicles.html'));
});

app.get('/admin/vehicles', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'admin-vehicles.html'));
});
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});