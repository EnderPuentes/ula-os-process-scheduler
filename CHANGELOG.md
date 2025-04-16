# Changelog

## [0.7.1](https://github.com/EnderPuentes/ula-so-process-scheduler/compare/0.7.0...0.7.1) (2025-04-16)

# [0.7.0](https://github.com/EnderPuentes/ula-so-process-scheduler/compare/0.6.0...0.7.0) (2025-03-14)


### Bug Fixes

* **simulator:** adjust maxBurstIoTick to prevent process overflow in simulator configuration ([20d1807](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/20d18076f6fcb5532f6668975b9437ec03d050fd))
* **simulator:** correct overflow styling in DialogContent for better UI layout ([f40209d](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/f40209daecdf00b6865531677fbe670928678573))


### Features

* **simulator:** add state management for simulator instance and processes ([678e71e](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/678e71e785d5de43a7aa14bc38291abb437ac922))

# [0.6.0](https://github.com/EnderPuentes/ula-so-process-scheduler/compare/0.5.0...0.6.0) (2025-03-13)


### Bug Fixes

* **simulator:** remove redundant arrival tick reset in I/O state ([57c6951](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/57c69519c7eab9d2ddd3d5b6101417a17860dd42))


### Features

* **license:** add LICENSE file and update README with project details ([fed406f](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/fed406f19ee42a164600e5dc6ae3e0d459cc4063))
* **simulator:** enhance process management with improved state synchronization and notifications ([fca3d1f](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/fca3d1f8c733ae27d58eaac26adbb7582ccca708))
* **types:** enhance type definitions with detailed comments for simulator algorithms and states ([3073ae7](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/3073ae75fec7fb64d881d31da52a09f98a6d5989))

# [0.5.0](https://github.com/EnderPuentes/ula-so-process-scheduler/compare/0.4.1...0.5.0) (2025-03-12)


### Bug Fixes

* **ui:** adjust process table height for better scrolling experience ([3c4b564](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/3c4b564be8fd5b9d1f701878bda6b4741c6c0cc3))
* **ui:** improve dialog content scrolling for process queues ([9661457](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/96614579850bb29e3b5740beb9d0b64e3a9ce400))


### Features

* **layout:** add footer component to root layout ([cc20e80](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/cc20e801fd6527ac89a9cbec32d14f016684ddf9))
* **monitor:** improve process details dialog with enhanced UI and icons ([7660ce8](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/7660ce8a567ca499440c62aedd3fc0263e59199a))
* **simulator:** add initial process selection and blocking methods to base simulator ([a5902db](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/a5902db0e57b96d46ad9923a9a4c3f8b0467243e))
* **simulator:** add synchronization for blocked processes queue ([b68bd7d](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/b68bd7d82dd47e7ba88ebfe135609110d3667ca2))
* **simulator:** enhance FCFS scheduling with process sorting and selection methods ([8d55e96](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/8d55e962675efe01fc0ccd0d6db45cba7cfeca42))
* **simulator:** implement process blocking logic for Expulsive Priority algorithm ([1ac371d](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/1ac371db43a9231b625f8f01e0013efd0d08c998))
* **simulator:** implement process blocking logic for Non-Expulsive Priority algorithm ([bc4ca13](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/bc4ca1346bf6e8f163c1f76185419bf751b37a2a))
* **simulator:** implement process blocking logic for Non-Expulsive Random algorithm ([8dce77e](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/8dce77e46729f7ad467aed9f0e5a4409fb7789d5))
* **simulator:** implement process blocking logic for Round Robin algorithm ([2ec0dbe](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/2ec0dbe26981f4e821eb4f5347ea2f43f4a2e651))
* **simulator:** implement process blocking logic for Shortest Job First algorithm ([ad77cdb](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/ad77cdb850510844a32146e77bcf086e666b56d6))
* **simulator:** implement process blocking logic for Shortest Remaining Time First algorithm ([bd425b9](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/bd425b9ac7d035817900d3c91a3aa433b7169572))
* **ui:** improve CPU usage statistic display precision ([ee646ed](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/ee646edeaacde7145e42abf402856058d62a0176))

## [0.4.1](https://github.com/EnderPuentes/ula-so-process-scheduler/compare/0.4.0...0.4.1) (2025-03-11)

# [0.4.0](https://github.com/EnderPuentes/ula-so-process-scheduler/compare/0.3.0...0.4.0) (2025-03-11)


### Bug Fixes

* **simulator:** handle process completion with less than or equal to zero remaining ticks ([3f2bdb5](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/3f2bdb5eebe7b594b92223dba4a6dbb21e3e116e))


### Features

* **algorithms:** add Non-Preemptive Priority algorithm to algorithm selection ([cbf4bb6](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/cbf4bb61c5a86b8e917988ea323ce740ee2b668f))
* **algorithms:** add Random scheduling algorithm implementation ([b71bc42](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/b71bc42584a82511ddaaaf82f3f15b613bee6351))
* **algorithms:** implement Non-Preemptive Priority scheduling algorithm ([c1a3af1](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/c1a3af1eb29e06fcfb9f2a2a2757e0f1fd293992))
* **algorithms:** implement Shortest Job First (SJF) scheduling algorithm ([60f2eca](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/60f2eca1a87237c77b3899fced6234a8e88406f6))
* **simulator:** add COMPLETED state to SimulatorState enum ([1290276](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/12902764f62e8c1c0cfaf83b50d44c3e35e76c5f))
* **simulator:** add comprehensive statistics tracking and visualization ([ba1d922](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/ba1d92257b3b72b85bec007ed0e92d12c2fd46b3))
* **simulator:** add dynamic process generation configuration ([f7bb8d4](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/f7bb8d495475a2d93a401178ecbec5228bdf29fb))
* **simulator:** add max burst IO tick configuration slider ([57fb39a](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/57fb39a3831c32295fd84a7422574eec9c2a9064))
* **simulator:** add max processes configuration slider ([21b3af7](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/21b3af74b0529ca2f05a3ac74d919c7ce7cc0e49))
* **simulator:** add Non-Expulsive Priority scheduling algorithm ([143da99](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/143da99b19ca10cad2d462f80abd0c7ea2ecfc7f))
* **simulator:** convert Non-Expulsive Priority to Expulsive Priority algorithm ([173f4f8](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/173f4f861896af446d4d5b58a0897e084335fbdf))
* **simulator:** enhance CPU monitoring with detailed process information ([44fe210](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/44fe2100e6e6ef3eb59080649129b8e51823191c))
* **simulator:** implement blocking state handling in FCFS algorithm ([503a78c](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/503a78ca9080897bbcb62805b32944ad87658467))
* **simulator:** implement dynamic algorithm selection and control ([75c6098](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/75c609824a358bed84f30920b0a2f42c5ab19c65))
* **simulator:** implement Expulsive Priority scheduling algorithm ([f7fa011](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/f7fa0112244c10e722ae6e86a516162ff881c9dc))
* **simulator:** implement Shortest Remaining Time First (SRTF) scheduling algorithm ([bc40eee](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/bc40eeeb1ee35f0b15ac7597b9feb11fd2e8e090))
* **simulator:** improve CPU usage display precision ([3d59b32](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/3d59b321a43d9dd98364572c311a6b7befc5097f))
* **simulator:** improve process generation and simulation flow ([4758f89](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/4758f89f2350fa2626c1784772f58b098839a4f3))
* **types:** add StateTransitionResult and update Process type with execution count ([8d8a6fa](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/8d8a6fa8e04c879d55dc0ef5aea8bc58faa3f97f))
* **ui:** add execution count column to process control table ([9235910](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/92359107665d6e712b0216ac1163c5d8ba338041))
* **ui:** add SimulatorMonitor with process queue visualization and details dialog ([aabf104](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/aabf10421f9f8fcad67722e527480caca8aa4eaf))
* **ui:** create detailed process control table with comprehensive process metrics ([c4d5fa4](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/c4d5fa4b6f7ef0b5caeac35f8679955aea30b4d1))

# [0.3.0](https://github.com/EnderPuentes/ula-so-process-scheduler/compare/0.2.0...0.3.0) (2025-03-09)


### Features

* add simulator state to configuration component for runtime control ([ba68897](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/ba6889746dea5546289093a9dfcc3606ab5cc009))

# 0.2.0 (2025-03-09)


### Features

* add configuration component for process scheduler simulator ([dd0fb29](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/dd0fb29fcbc0fc70a0d2068dc9a63f5bb3e1e195))
* add form and select Shadcn UI components with Radix UI primitives ([d9076f0](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/d9076f055b4668c397b303868665af1b353a2ee4))
* add form validation and zod schema for process generation ([5074035](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/50740351b491e7532db59ff55229921218b897e0))
* add process control table with detailed process state visualization ([9b1d438](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/9b1d4385ef9b4452cf25990e493c74e72789a49a))
* add Radix UI primitives and UI components for enhanced interactivity ([7435d1e](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/7435d1e095d37cc8de7a45ca21094d9751dbb703))
* add Radix UI Separator component for improved UI separation ([7937095](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/7937095753039b2c03e012b62172ac6487af8e4f))
* add random process generation and dynamic process queue management ([4fe0466](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/4fe0466f7b76a89a37c6935d543a2660dd3c0447))
* add Shadcn UI table component for process visualization ([bf92b94](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/bf92b94380d36404016f66a85ac93f293dcdaeb4))
* add SimulatorProcessor component for process execution visualization ([e2fdce4](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/e2fdce4fbc11787db334bcb2d631c722c9fa009b))
* add theme support with next-themes and theme toggler ([3345ff3](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/3345ff322be4271d935f9a648014b537441888d5))
* create algorithms module for process scheduling ([7924270](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/792427050cfca6ddb02bb6821ff73ded20cac71c))
* define core simulator types and enums for process scheduling ([1935c3f](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/1935c3f31c629acdfd7952b20a127e03ec348bc5))
* enhance simulator configuration and process generation ([8a3252f](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/8a3252f1e9a35471eaadce47bf98ee7ad3ee5b00))
* implement base ProcessSchedulerSimulator with core simulator controls ([4b89cef](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/4b89cef1719e562326c088d659bbf21ab7b47dc0))
* implement First-Come, First-Served (FCFS) scheduling algorithm ([5bf583c](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/5bf583c4122ee9f4a9444b3679dffc4ea03ee616))
* implement process scheduling simulator core logic with tick-based simulation ([127f58a](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/127f58a4abbd31978587cba181aa28e87132d343))
* improve process control table with sorting and empty state ([9289d1c](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/9289d1c24250109becfa40853a42bb48ab1bcd57))
* improve simulator UI and add configuration component integration ([030f67e](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/030f67e346cd4488aa1aaf17afdc9cf74a85fa83))
* init setup nextjs ([407d9fa](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/407d9fa253242738621b007a5179b12bca65fd72))
* update home page to render ProcessSchedulerSimulatorVisualizer ([06f06fb](https://github.com/EnderPuentes/ula-so-process-scheduler/commit/06f06fba6dc4b11a4829a441525b73c9eb212ebc))
