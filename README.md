# 👾 Simulador de Planificación de Procesos

Este simulador emula la ejecución de procesos en una CPU, aplicando un algoritmo de planificación y gestionando los estados de los procesos. Su propósito es analizar el comportamiento de diferentes estrategias de planificación en un entorno controlado.

Para ver la versión de producción, haz clic [aquí](https://ula-so-process-scheduler.vercel.app/).

## Definición

Este simulador gestiona procesos con diferentes estados:

- **READY**: El proceso está listo para ser ejecutado.
- **RUNNING**: El proceso se está ejecutando actualmente en la CPU.
- **BLOCKED**: El proceso está esperando a que se resuelva un evento (por ejemplo, una operación de E/S).
- **COMPLETED**: El proceso ha terminado su ejecución.

Además el silulador cuenta con su propio estado:

- **STOPPED**: El simulador está detenido y no se están ejecutando procesos.
- **RUNNING**: El simulador está en ejecución y los procesos están siendo gestionados.
- **PAUSED**: El simulador está pausado y la ejecución de los procesos está temporalmente detenida.

### Colas de Procesos

- **Ready Queue**: Contiene procesos en estado READY, esperando ser ejecutados.
- **Blocked Queue**: Contiene procesos en estado BLOCKED, esperando a que se resuelva un evento.

Además, el simulador cuenta con una lista de procesos completados:

- **Completed Processes List**: Contiene procesos que han terminado su ejecución y están en estado COMPLETED.

### Algoritmos Preventivos

- **Priority Scheduling:** Asigna una prioridad a cada proceso, y la CPU siempre atiende al proceso con la prioridad más alta. Si llega un proceso de mayor prioridad, el proceso actual se interrumpe.
- **Round Robin:** Cada proceso recibe una cantidad fija de tiempo (quantum) para ejecutarse. Si el proceso no termina dentro de este tiempo, se mueve al final de la cola y otro proceso toma el control.
- **Shortest Remaining Time First (SRTF):** Una variación de SJF donde siempre se selecciona el proceso con el menor tiempo de ejecución restante, incluso si interrumpe el proceso que se está ejecutando actualmente.

### Algoritmos No Preventivos

- **First Come, First Served (FCFS):** Los procesos se ejecutan en el orden en que llegan, sin interrupciones.
- **Priority Scheduling:** Similar a la versión preventiva, pero una vez que un proceso comienza su ejecución, no puede ser interrumpido.
- **Random Scheduling:** Selecciona aleatoriamente un proceso de la cola de listos para su ejecución.
- **Shortest Job First (SJF):** Ejecuta primero el proceso con el tiempo estimado de ejecución más corto, sin interrumpir los procesos en curso.

### Manejo de Procesos Bloqueados

Para simular operaciones de E/S, al generar procesos aleatorios, si el **burst time** es mayor a 5, se asigna un tiempo de **burst I/O**. Cuando el proceso alcanza la mitad de su ejecución, se bloquea para "simular la escritura en disco". Una vez desbloqueado, se reinserta en la cola de listos y reanuda la ejecución según el algoritmo de planificación activo en el próximo cambio de contexto.

Los procesos bloqueados se almacenan en una **Blocked Queue**, que gestiona sus transiciones de vuelta a la cola de listos después de completar la E/S.

## Configuración

El simulador permite ajustar los siguientes parámetros:

### Parámetros Generales

- **Clock speed**: Define el tiempo para cada tick del reloj del simulador.
- **Initial number of processes**: Determina cuántos procesos se generan al inicio de la simulación.
- **Maximum CPU burst duration**: Establece el límite superior para el tiempo de ejecución de un proceso en la CPU.
- **Maximum blocked wait time**: Controla cuánto tiempo puede permanecer un proceso en la cola de bloqueados antes de reintentar la ejecución.
- **Maximum number of concurrent processes**: Define cuántos procesos pueden existir en el sistema simultáneamente.

### Configuración del Algoritmo de Planificación

- **Quantum**: (Para Round Robin) Define el número de ticks antes de que un proceso deba ceder la CPU.
- **Priority type**: (Para la planificación por prioridad) Puede ser estática o dinámica.
- **SJF mode**: Permite seleccionar si el algoritmo es preventivo o no preventivo.

### Configuración del Proceso

- **Random process generation**: Habilita o deshabilita la creación automática de nuevos procesos durante la simulación.
- **Burst time range**: Define los valores mínimos y máximos para la duración del proceso.
- **Blocking probability**: Determina con qué frecuencia un proceso entra en el estado BLOCKED.
- **Maximum wait time in the ready queue**: Ajusta cuánto tiempo puede esperar un proceso antes de ser priorizado para su ejecución.

## Estadísticas

Durante la simulación, se recopilan las siguientes métricas:

- **Average waiting time**
- **CPU utilization**
- **Total execution time**
- **Total number of executed processes**
- **Average blocked time**
- **Number of context switches**

## Estructura del Proyecto

El proyecto se divide en dos partes:

1. **Interfaz Gráfica (Frontend):** Construida con Next.js para visualizar los algoritmos de planificación. La interfaz de usuario se ejecuta en el cliente y está compuesta por [Tailwind CSS](https://tailwindcss.com/) y componentes de [shadcn/ui](https://ui.shadcn.com/).
2. **Lógica de Simulación (Backend):** Gestiona los procesos y ejecuta los algoritmos de planificación.

## Interfaz de Usuario

El simulador cuenta con una interfaz interactiva que muestra los detalles de la ejecución de procesos en tiempo real. Los principales elementos de la interfaz incluyen:

- **Control Panel:** Permite pausar y reanudar la ejecución, seleccionar algoritmos de planificación y ajustar configuraciones.
- **Processing Status:** Muestra el estado actual de la CPU y el número de procesos bloqueados y listos.
- **Performance Metrics:** Muestra el uso de la CPU, los ticks totales, los procesos totales y las estadísticas de ejecución promedio.
- **Process Control Table:** Lista todos los procesos activos con detalles como prioridad, estado, tiempo de ráfaga, tiempo restante, tiempo de espera y tiempo de respuesta.

![Simulator Screenshot](docs/simulator.png)

## Libreria del Simulador

Toda la lógica relacionada con el simulador se encuentra en `./src/libs`. El proyecto utiliza TypeScript, con definiciones de tipos almacenadas en `./src/lib/types.ts`.

El simulador se basa en una clase **Base Simulator**, con cada algoritmo teniendo una clase hija que hereda la funcionalidad base. Cada clase hija solo implementa el planificador de procesos y un método para ordenar la cola de listos. Además, la clase **Simulator** utiliza una función `notify` para informar a la interfaz de usuario sobre los cambios, asegurando la sincronización en tiempo real.

## Empezando

Para ejecutar el proyecto localmente:

```bash
git clone git@github.com:EnderPuentes/ula-so-process-scheduler.git process-scheduler
cd process-scheduler
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

Puedes comenzar a editar la aplicación modificando `app/page.tsx`. La página se actualiza automáticamente a medida que realizas cambios.

Este proyecto utiliza [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para optimizar y cargar [Geist](https://vercel.com/font), una familia de fuentes moderna de Vercel.

## Aprende Más

Para aprender más sobre Next.js, consulta estos recursos:

- [Documentación de Next.js](https://nextjs.org/docs) - Aprende sobre las características y APIs de Next.js.
- [Aprende Next.js](https://nextjs.org/learn) - Un tutorial interactivo.
- [Repositorio de GitHub de Next.js](https://github.com/vercel/next.js) - Tus comentarios y contribuciones son bienvenidos.

Consulta la [Documentación de Despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.

## Licencia

Para más detalles, por favor consulta el archivo [LICENSE](./LICENSE.md).
