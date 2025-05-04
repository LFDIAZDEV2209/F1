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


app.get('/api/teams', (req, res) => {
    fs.readFile(teamsPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error al leer los datos' });
        res.json(JSON.parse(data));
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

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
